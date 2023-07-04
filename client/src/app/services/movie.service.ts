import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment.development';
import { ViewHistory } from '../models/view-history';

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

  saveViewHistory(viewHistory: ViewHistory): void {
    this.http.post<ViewHistory>(
      `${this.SPRINGBOOT_BASE_API_URL_ENDPOINT}/save`,
      viewHistory
    );
  }
}
