import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { HandGestureService } from '../services/hand-gesture.service';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  carouselIndex: number = 0;
  swipeSubscription$!: Subscription;
  selectSubscription$!: Subscription;
  storage: Storage = sessionStorage;

  constructor(
    private handGestureService: HandGestureService,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMovies();
    this.handGestureService.resetLast();
    this.swipeSubscription$ = this.handGestureService.swipe$
      .pipe(
        tap((value) => console.info('Swiped: ', value)),
        filter((value) => value === 'left' || value === 'right')
      )
      .subscribe((direction) => {
        this.moveCarousel(direction);
      });
    this.selectSubscription$ = this.handGestureService.gesture$
      .pipe(
        tap((value) => console.info('Gestured: ', value)),
        filter((value) => value === 'ok')
      )
      .subscribe((value) => {
        if (value === 'ok') {
          this.navigateToMovieDetails(this.carouselIndex);
        }
      });
  }

  ngOnDestroy(): void {
    // clean up subscriptions
    this.swipeSubscription$.unsubscribe();
    this.selectSubscription$.unsubscribe();
  }

  moveCarousel(direction: string) {
    if (direction === 'right') {
      if (this.carouselIndex >= this.movies.length) {
        this.carouselIndex = 0;
      }
      this.carouselIndex++;
    } else {
      if (this.carouselIndex <= 0) {
        this.carouselIndex = this.movies.length - 1;
      }
      this.carouselIndex--;
    }
  }

  navigateToMovieDetails(index: number) {
    this.storage.setItem('selectedMovieCarouselIndex', index.toString()); // use session storage to persist carousel position if user wishes to select another movie
    this.router.navigate(['movie', this.movies[index].id]);
  }

  getMovies() {
    const value = this.storage.getItem('movies');
    if (value === null) {
      this.movieService.getMovies().subscribe((results) => {
        this.movies = results;
        this.storage.setItem('movies', JSON.stringify(results));
      });
    } else {
      this.movies = JSON.parse(value);
      const index = this.storage.getItem('selectedMovieCarouselIndex');
      if (index !== null) {
        this.carouselIndex = +index;
      }
    }
  }
}
