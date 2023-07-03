import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HandGestureService } from '../services/hand-gesture.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
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

  ngOnInit(): void {
    const movieId: number = +this.activatedRoute.snapshot.params['id'];
    this.getMovieById(movieId);
    this.handGestureService.resetLast();
    this.selectSubscription$ = this.handGestureService.gesture$
      .pipe(
        tap((value) => console.info('Gestured: ', value)),
        filter((value) => value === 'peace')
      )
      .subscribe((value) => {
        if (value === 'peace') {
          this.router.navigate(['/movies']);
        }
      });
  }

  ngOnDestroy(): void {
    this.selectSubscription$.unsubscribe();
  }

  getMovieById(id: number) {
    this.movie$ = firstValueFrom(this.movieService.getMovieById(id));
  }
}