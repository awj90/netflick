import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrendingMovie } from '../models/trending-movie';
import { MovieService } from '../services/movie.service';
import { HandGestureService } from '../services/hand-gesture.service';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  trendingMovies: TrendingMovie[] = [];
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
    this.getTrendingMovies();
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
    this.swipeSubscription$.unsubscribe();
    this.selectSubscription$.unsubscribe();
  }

  moveCarousel(direction: string) {
    if (direction === 'right') {
      if (this.carouselIndex >= this.trendingMovies.length) {
        this.carouselIndex = 0;
      }
      this.carouselIndex++;
    } else {
      if (this.carouselIndex <= 0) {
        this.carouselIndex = this.trendingMovies.length - 1;
      }
      this.carouselIndex--;
    }
  }

  navigateToMovieDetails(index: number) {
    this.carouselIndex = index;
    this.storage.setItem('selectedMovie', this.carouselIndex.toString());
    this.router.navigate(['movie', this.trendingMovies[this.carouselIndex].id]);
  }

  getTrendingMovies() {
    const value = this.storage.getItem('trendingMovies');
    if (value === null) {
      this.movieService.getTrendingMovies().subscribe((results) => {
        this.trendingMovies = results.results;
        this.storage.setItem(
          'trendingMovies',
          JSON.stringify(this.trendingMovies)
        );
      });
    } else {
      this.trendingMovies = JSON.parse(value);
      const index = this.storage.getItem('selectedMovie');
      if (index !== null) {
        this.carouselIndex = +index;
      }
    }
  }
}
