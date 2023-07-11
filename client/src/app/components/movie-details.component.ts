import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HandGestureService } from '../services/hand-gesture.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private movieService: MovieService,
    private handGestureService: HandGestureService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  selectSubscription$!: Subscription;
  movie$!: Promise<Movie>;
  storage: Storage = sessionStorage;

  ngOnInit(): void {
    // get movie id from route and get movie by movie id
    const movieId: number = +this.activatedRoute.snapshot.params['id'];
    this.getMovieById(movieId);

    // subscribe to hand gesture detection
    this.handGestureService.resetLast();
    this.selectSubscription$ = this.handGestureService.gesture$
      .pipe(
        tap((value) => console.info('Gestured: ', value)),
        filter((value) => value === 'back' || value === 'ok'),
        debounceTime(500)
      )
      .subscribe((value) => {
        if (value === 'back') {
          this.navigateToMovieGenres();
        }
        if (value === 'ok') {
          this.router.navigate(['./player'], {
            relativeTo: this.activatedRoute,
          });
        }
      });
  }

  ngOnDestroy(): void {
    // clean up subscriptions
    this.selectSubscription$.unsubscribe();
  }

  getMovieById(id: number) {
    this.movie$ = firstValueFrom(this.movieService.getMovieById(id));
  }

  navigateToMovieGenres() {
    const value = this.storage.getItem('selectedGenreName');
    if (value !== null) {
      this.router.navigate(['/movie-genres', value]);
    } else {
      this.router.navigate(['/movie-genres']);
    }
  }
}
