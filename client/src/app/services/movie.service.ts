import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment';
import { ViewHistory } from '../models/view-history';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  SPRINGBOOT_BASE_API_URL_ENDPOINT: string = environment['serverApiUrl'];
  searchMode: boolean = false;

  constructor(private http: HttpClient) {}

  // GET /api/movie-genres
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/movie-genres`
    );
  }

  // GET /api/movie-genres/:genre
  getMoviesByGenre(genre: string): Observable<Movie[]> {
    console.info('loading');
    return this.http.get<Movie[]>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/movie-genres/${genre}`
    );
  }

  // GET /api/movie/:id
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/movie/${id}`
    );
  }

  // PUT /api/view-history
  saveViewHistory(viewHistory: ViewHistory) {
    return this.http.put<ViewHistory>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/view-history`,
      viewHistory
    );
  }

  // GET /api/view-history?email=fred@gmail.com&movieId=1
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

  // GET /api/watched-movies?email=fred@gmail.com
  getWatchedMovies(email: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/watched-movies`,
      {
        params: new HttpParams().set('email', email),
      }
    );
  }

  // GET /api/search?key=revenge
  searchMoviesByKeyword(key: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/search`,
      {
        params: new HttpParams().set('key', key),
      }
    );
  }
}
