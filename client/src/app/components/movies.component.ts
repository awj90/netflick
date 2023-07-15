import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { HandGestureService } from '../services/hand-gesture.service';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/movie';
import { Title } from '@angular/platform-browser';

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
  loading: boolean = true;

  constructor(
    private handGestureService: HandGestureService,
    private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit() {
    this.loading = true;
    this.handGestureService.resetLast();

    const newGenre: string = this.activatedRoute.snapshot.params['genre'];
    this.title.setTitle(`Netflick | Browse ${newGenre} movies`);
    const previousGenre = this.storage.getItem('selectedGenreName');

    this.getMovies(previousGenre, newGenre);

    this.swipeSubscription$ = this.handGestureService.swipe$
      .pipe(
        tap((value) => console.info('Swiped: ', value)),
        filter((value) => value === 'left' || value === 'right')
      )
      .subscribe({
        next: (direction) => {
          this.moveCarousel(direction);
        },
        error: (error) => {
          alert(error);
          console.info(error);
        },
      });
    this.selectSubscription$ = this.handGestureService.gesture$
      .pipe(
        tap((value) => console.info('Gestured: ', value)),
        filter((value) => value === 'ok' || value === 'back'),
        debounceTime(500)
      )
      .subscribe({
        next: (value) => {
          if (value === 'ok') {
            this.navigateToMovieDetails(this.carouselIndex);
          }
          if (value === 'back') {
            this.navigateToMovieGenres(this.carouselIndex);
          }
        },
        error: (error) => {
          alert(error);
          console.info(error);
        },
      });
  }

  ngOnDestroy(): void {
    // clean up subscriptions
    this.swipeSubscription$.unsubscribe();
    this.selectSubscription$.unsubscribe();
  }

  moveCarousel(direction: string) {
    if (direction === 'right') {
      this.carouselIndex++;
      if (this.carouselIndex >= this.movies.length) {
        this.carouselIndex = 0;
      }
    } else {
      this.carouselIndex--;
      if (this.carouselIndex < 0) {
        this.carouselIndex = this.movies.length - 1;
      }
    }
  }

  navigateToMovieGenres(index: number) {
    this.storage.setItem('selectedMovieCarouselIndex', index.toString()); // use session storage to persist carousel position
    this.router.navigate(['movie-genres']);
  }

  navigateToMovieDetails(index: number) {
    this.storage.setItem('selectedMovieCarouselIndex', index.toString()); // use session storage to persist carousel position
    this.router.navigate(['movie', this.movies[index].id]);
  }

  getMovies(previousGenre: string | null, newGenre: string) {
    if (previousGenre === null || previousGenre !== newGenre) {
      this.storage.setItem('selectedGenreName', newGenre);
      this.movieService.getMoviesByGenre(newGenre).subscribe({
        next: (results) => {
          this.movies = results;
          this.storage.setItem('movies', JSON.stringify(results));
          this.loading = false;
        },
        error: (error) => {
          alert(error);
          console.info(error);
          this.loading = false;
        },
      });
    } else {
      const value = this.storage.getItem('movies');
      if (value !== null) {
        this.movies = JSON.parse(value);
        const index = this.storage.getItem('selectedMovieCarouselIndex');
        if (index !== null) {
          this.carouselIndex = +index;
        }
      }
      this.loading = false;
    }
  }
}
