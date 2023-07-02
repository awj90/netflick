import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from '../models/movie-details';
import { HandGestureService } from '../services/hand-gesture.service';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { MovieCast } from '../models/movie-cast';
import { MovieVideos } from '../models/movie-videos';

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
  movieDetails$!: Promise<MovieDetails>;
  movieTrailers$!: Promise<MovieVideos>;
  movieCast$!: Promise<MovieCast>;

  ngOnInit(): void {
    const movieId: number = +this.activatedRoute.snapshot.params['id'];
    this.getMovieDetailsById(movieId);
    this.getMovieTrailersById(movieId);
    this.getMovieCastById(movieId);
    this.handGestureService.resetLast();
    this.selectSubscription$ = this.handGestureService.gesture$
      .pipe(
        tap((value) => console.info('Gestured: ', value)),
        filter((value) => value === 'one')
      )
      .subscribe((value) => {
        if (value === 'one') {
          this.router.navigate(['/movies']);
        }
      });
  }

  ngOnDestroy(): void {
    this.selectSubscription$.unsubscribe();
  }

  getMovieDetailsById(id: number) {
    this.movieDetails$ = this.movieService.getMovieDetailsById(id).toPromise();
  }

  getMovieTrailersById(id: number) {
    this.movieTrailers$ = this.movieService
      .getMovieTrailersById(id)
      .toPromise();
  }

  getMovieCastById(id: number) {
    this.movieCast$ = this.movieService.getMovieCastById(id).toPromise();
  }
}
