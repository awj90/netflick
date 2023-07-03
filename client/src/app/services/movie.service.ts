import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('/api/movies');
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`/api/movie/${id}`);
  }

  getMovieTrailersById(id: number): Observable<any> {
    const FULL_API_URL: string = ``;
    return this.http.get(FULL_API_URL);
  }

  getMovieCastById(id: number): Observable<any> {
    const FULL_API_URL: string = ``;
    return this.http.get(FULL_API_URL);
  }
}
