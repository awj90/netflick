import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Subscription, filter, map, tap } from 'rxjs';
import { Movie } from '../models/movie';
import { HandGestureService } from '../services/hand-gesture.service';
import { ViewHistory } from '../models/view-history';

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
  swipeSubscription$!: Subscription;
  selectSubscription$!: Subscription;
  intervalId!: any;
  storage: Storage = sessionStorage;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private handGestureService: HandGestureService
  ) {}

  ngOnInit(): void {
    const movieId: number = +this.activatedRoute.snapshot.params['id'];
    this.getMovieById(movieId);
    this.swipeSubscription$ = this.handGestureService.swipe$
      .pipe(
        tap((value) => console.info('Swiped: ', value)),
        filter((value) => value === 'left' || value === 'right')
      )
      .subscribe((direction) => {
        clearInterval(this.intervalId);
        if (direction === 'left') {
          this.rewind(); // swipe left to rewind video
        } else if (direction === 'right') {
          this.ff(); // swipe right to fast forward video
        }
      });
    this.selectSubscription$ = this.handGestureService.gesture$
      .pipe(
        tap((value) => console.info('Gestured: ', value)),
        filter((value) => value === 'peace' || value === 'ok')
      )
      .subscribe((value) => {
        clearInterval(this.intervalId);
        if (value === 'peace') {
          const playerState: number = this.player.getPlayerState();
          if (playerState === 2) {
            // player was paused, unpause it
            this.player.playVideo();
          } else {
            // pause the player if it not currently paused
            this.player.pauseVideo();
          }
        }
        if (value === 'ok') {
          this.stopVideo();
        }
      });
  }

  ngOnDestroy(): void {
    // clean up subscriptions
    this.swipeSubscription$.unsubscribe();
    this.selectSubscription$.unsubscribe();
    this.saveViewHistory(); // posts (or puts if existing) movie elapsed time to springboot backend for future retrieval if user returns back to watch the same movie
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
        start: 0,
        rel: 0,
        fs: 1,
        modestbranding: 1,
        playsinline: 0,
        enablejsapi: 1,
        origin: 'http://localhost:4200',
      },
      events: {
        onReady: this.onPlayerReady.bind(this), // configure YouTube iframe player API to call onPlayerReady() when the video player is ready
      },
    });
  }

  onPlayerReady(event: any) {
    event.target.playVideo();
  }

  // stop video
  stopVideo() {
    this.player.stopVideo();
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  // fastforward video
  ff() {
    let currentVideoTime: number = this.player.getCurrentTime();
    this.intervalId = setInterval(() => {
      currentVideoTime += 10;
      this.player.seekTo(currentVideoTime, true);
    }, 1000); // use interval to keep fastforwarding until stopped
  }

  // rewind video
  rewind() {
    let currentVideoTime: number = this.player.getCurrentTime();
    this.intervalId = setInterval(() => {
      currentVideoTime -= 10;
      this.player.seekTo(currentVideoTime, true);
    }, 1000); // use interval to keep rewinding until stopped
  }

  getMovieById(id: number) {
    this.movieService
      .getMovieById(id)
      .pipe(
        tap((movie) => (this.movie = movie)),
        map((movie) => movie.video_id)
      )
      .subscribe((id) => {
        this.videoId = id;
        this.initYT();
      });
  }

  saveViewHistory() {
    const user = this.storage.getItem('user');
    if (!!user) {
      const userEmail: string = JSON.parse(user).email;
      const viewHistory: ViewHistory = {
        email: userEmail,
        movie_id: this.movie.id,
        time_elapsed: Math.round(this.player.getCurrentTime()),
      };
      this.movieService.saveViewHistory(viewHistory);
    }
  }
}
