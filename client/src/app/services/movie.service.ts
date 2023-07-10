import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment.development';
import { ViewHistory } from '../models/view-history';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  SPRINGBOOT_BASE_API_URL_ENDPOINT: string = environment['serverApiUrl'];

  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/movie-genres`
    );
  }

  getMoviesByGenre(genre: string): Observable<Movie[]> {
    console.info('loading');
    return this.http.get<Movie[]>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/movies/${genre}`
    );
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/movie/${id}`
    );
  }

  saveViewHistory(viewHistory: ViewHistory) {
    return this.http.put<ViewHistory>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/view-history`,
      viewHistory
    );
  }

  getViewHistory(
    email: string,
    movieId: number
  ): Observable<{ elapsed_time: string }> {
    return this.http.get<{ elapsed_time: string }>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/view-history`,
      {
        params: new HttpParams().set('email', email).set('movieId', movieId),
      }
    );
  }
}
