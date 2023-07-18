import { Component } from '@angular/core';
import { Genre } from '../models/genre';
import { Subscription, debounceTime, filter, tap } from 'rxjs';
import { HandGestureService } from '../services/hand-gesture.service';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-categories',
  templateUrl: './movie-categories.component.html',
  styleUrls: ['./movie-categories.component.css'],
})
export class MovieCategoriesComponent {
  nestedGenres: Genre[][] = []; // array of arrays eg. [ ['Action', 'Adventure', 'Comedy'], ['Drama', 'Family', 'Horror'], ... ]
  carouselIndex: number = 0;
  swipeSubscription$!: Subscription;
  selectSubscription$!: Subscription;
  storage: Storage = sessionStorage;
  loading: boolean = true;

  constructor(
    private handGestureService: HandGestureService,
    private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.handGestureService.resetLast();
    this.movieService.searchMode = false;
    this.getGenres();
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
        filter(
          (value) =>
            value === 'one' ||
            value === 'two' ||
            value === 'three' ||
            value === 'back'
        ),
        debounceTime(500)
      )
      .subscribe({
        next: (value) => {
          if (value === 'one') {
            this.navigateToMoviesInSelectedGenre(
              this.nestedGenres[this.carouselIndex][0]
            );
          }
          if (value === 'two') {
            this.navigateToMoviesInSelectedGenre(
              this.nestedGenres[this.carouselIndex][1]
            );
          }
          if (value === 'three') {
            this.navigateToMoviesInSelectedGenre(
              this.nestedGenres[this.carouselIndex][2]
            );
          }
          if (value === 'back') {
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
      if (this.carouselIndex >= this.nestedGenres.length) {
        this.carouselIndex = 0;
      }
    } else {
      this.carouselIndex--;
      if (this.carouselIndex < 0) {
        this.carouselIndex = this.nestedGenres.length - 1;
      }
    }
  }

  navigateToMoviesInSelectedGenre(genre: Genre) {
    this.storage.setItem(
      'selectedGenreCarouselIndex',
      this.carouselIndex.toString()
    ); // use session storage to persist carousel position if user wishes to select another genre
    this.router.navigate(['movie-genres', genre.genre_name]);
  }

  getGenres() {
    const value = this.storage.getItem('genres');
    if (value === null) {
      this.movieService.getGenres().subscribe({
        next: (results) => {
          let carouselSlideSize = 3;
          while (results.length > 0) {
            this.nestedGenres.push(results.splice(0, carouselSlideSize));
          }
          this.storage.setItem('genres', JSON.stringify(this.nestedGenres));
          this.loading = false;
        },
        error: (error) => {
          alert(error);
          console.info(error);
          this.loading = false;
        },
      });
    } else {
      this.nestedGenres = JSON.parse(value);
      const index = this.storage.getItem('selectedGenreCarouselIndex');
      if (index !== null) {
        this.carouselIndex = +index;
      }
      this.loading = false;
    }
  }
}
