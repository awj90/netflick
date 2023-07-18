import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import {
  Subscription,
  debounceTime,
  filter,
  firstValueFrom,
  map,
  tap,
} from 'rxjs';
import { Movie } from '../models/movie';
import { HandGestureService } from '../services/hand-gesture.service';
import { ViewHistory } from '../models/view-history';
import { Title } from '@angular/platform-browser';

declare var YT: any;

@Component({
  selector: 'app-movie-player',
  templateUrl: './movie-player.component.html',
  styleUrls: ['./movie-player.component.css'],
})
export class MoviePlayerComponent implements OnInit, OnDestroy {
  player: any;
  videoId!: string;
  movie!: Movie;
  userEmail!: string;
  elapsedTime!: number;
  swipeSubscription$!: Subscription;
  selectSubscription$!: Subscription;
  intervalId!: any;
  storage: Storage = sessionStorage;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private handGestureService: HandGestureService,
    private title: Title
  ) {}

  ngOnInit(): void {
    // get email
    const user = this.storage.getItem('user');
    if (!!user) {
      this.userEmail = JSON.parse(user).email;
    }

    // get movieId
    const movieId: number = +this.activatedRoute.snapshot.params['id'];

    // get the movie timestamp at which the user last stopped watching to resume playing from there
    this.getViewHistory(this.userEmail, movieId);

    // subscribe to hand gesture detection
    this.swipeSubscription$ = this.handGestureService.swipe$
      .pipe(
        tap((value) => console.info('Swiped: ', value)),
        filter((value) => value === 'left' || value === 'right')
      )
      .subscribe({
        next: (direction) => {
          clearInterval(this.intervalId);
          if (direction === 'left') {
            this.rewind(); // swipe left to rewind video
          } else if (direction === 'right') {
            this.ff(); // swipe right to fast forward video
          }
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
            value === 'zero' ||
            value === 'back' ||
            value === 'one' ||
            value === 'two'
        ),
        debounceTime(500)
      )
      .subscribe({
        next: (value) => {
          clearInterval(this.intervalId);
          if (value === 'zero') {
            const playerState: number = this.player.getPlayerState();
            if (playerState === 2) {
              // player was paused, unpause it
              this.player.playVideo();
            } else {
              // pause the player if it not currently paused
              this.player.pauseVideo();
            }
          }
          if (value === 'back') {
            this.player.stopVideo();
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
          }
          if (value === 'one') {
            this.player.setPlaybackRate(1);
          }
          if (value === 'two') {
            this.player.setPlaybackRate(2);
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
    this.saveViewHistory(); // posts (or puts if existing) movie elapsed time to springboot backend for future retrieval if user returns back to watch the same movie
  }

  getViewHistory(email: string, movieId: number) {
    firstValueFrom(this.movieService.getViewHistory(email, movieId)).then(
      (result) => {
        this.elapsedTime = +result.elapsed_time;
        this.getMovieById(movieId);
      }
    );
  }

  saveViewHistory() {
    const user = this.storage.getItem('user');
    if (!!user) {
      this.userEmail = JSON.parse(user).email;
    }
    const viewHistory: ViewHistory = {
      email: this.userEmail,
      movie_id: this.movie.id.toString(),
      time_elapsed: Math.round(this.player.getCurrentTime()).toString(),
    };
    firstValueFrom(this.movieService.saveViewHistory(viewHistory)).then(
      () => {}
    );
  }

  getMovieById(id: number) {
    this.movieService
      .getMovieById(id)
      .pipe(
        tap((movie) => {
          this.movie = movie;
          this.title.setTitle(`Netflick | Now Playing: ${movie.title}`);
        }),
        map((movie) => movie.video_id)
      )
      .subscribe({
        next: (id) => {
          this.videoId = id;
          this.initYT();
        },
        error: (error) => {
          alert(error);
          console.info(error);
        },
      });
  }

  // create a YouTube player
  initYT() {
    this.player = new YT.Player('player', {
      videoId: this.videoId, // youtube videoId
      height: '100%', // full screen
      width: '100%', // full screen
      playerVars: {
        autoplay: 1, // autoplay
        controls: 1, // display controls
        start: !!this.elapsedTime ? this.elapsedTime : 0,
        rel: 0,
        fs: 1,
        modestbranding: 1,
        playsinline: 0,
      },
      events: {
        onReady: this.onPlayerReady.bind(this), // configure YouTube iframe player API to call onPlayerReady() when the video player is ready
      },
    });
  }

  onPlayerReady(event: any) {
    event.target.playVideo();
  }

  // fastforward video
  ff() {
    let currentVideoTime: number = this.player.getCurrentTime();
    this.intervalId = setInterval(() => {
      currentVideoTime += 10;
      this.player.seekTo(
        Math.min(currentVideoTime, this.player.getDuration()),
        true
      );
    }, 1000); // use interval to keep fastforwarding until stopped
  }

  // rewind video
  rewind() {
    let currentVideoTime: number = this.player.getCurrentTime();
    this.intervalId = setInterval(() => {
      currentVideoTime -= 10;
      this.player.seekTo(Math.max(currentVideoTime, 0), true);
    }, 1000); // use interval to keep rewinding until stopped
  }
}
