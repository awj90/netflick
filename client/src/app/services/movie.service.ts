import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private BASE_API_URL: string = 'https://api.themoviedb.org/3';
  private API_KEY: string = '3c79e5a941dad932d925df6ad5c3df79';

  constructor(private http: HttpClient) {}

  getTrendingMovies(): Observable<any> {
    const FULL_API_URL: string = `${this.BASE_API_URL}/trending/all/week?api_key=${this.API_KEY}`;
    return this.http.get(FULL_API_URL);
  }

  getMovieDetailsById(id: number): Observable<any> {
    const FULL_API_URL: string = `${this.BASE_API_URL}/movie/${id}?api_key=${this.API_KEY}`;
    return this.http.get(FULL_API_URL);
  }

  getMovieTrailersById(id: number): Observable<any> {
    const FULL_API_URL: string = `${this.BASE_API_URL}/movie/${id}/videos?api_key=${this.API_KEY}`;
    return this.http.get(FULL_API_URL);
  }

  getMovieCastById(id: number): Observable<any> {
    const FULL_API_URL: string = `${this.BASE_API_URL}/movie/${id}/credits?api_key=${this.API_KEY}`;
    return this.http.get(FULL_API_URL);
  }
}
