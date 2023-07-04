import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  SPRINGBOOT_BASE_API_URL_ENDPOINT: string = environment['serverApiUrl'];

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/movies`
    );
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/movie/${id}`
    );
  }
}
