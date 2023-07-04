import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Subscription, filter, map, tap } from 'rxjs';
import { Movie } from '../models/movie';
import { HandGestureService } from '../services/hand-gesture.service';

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
          this.rewind();
        } else if (direction === 'right') {
          this.ff();
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
            // pause the player if it is not currently paused
            this.player.pauseVideo();
          }
        }
        if (value === 'ok') {
          this.stopVideo();
        }
      });
  }

  ngOnDestroy(): void {
    this.swipeSubscription$.unsubscribe();
  }

  // create an <iframe> (and YouTube player)
  initYT() {
    this.player = new YT.Player('player', {
      videoId: this.videoId,
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1,
        controls: 1,
        start: 0,
        rel: 0,
        fs: 1,
        modestbranding: 1,
        playsinline: 0,
        enablejsapi: 1,
        origin: 'http://localhost:4200',
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
      },
    });
  }

  // YT iframe player API calls this function when the video player is ready
  onPlayerReady(event: any) {
    event.target.playVideo();
  }

  // function to stop video
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
    }, 1000);
  }
  // rewind video
  rewind() {
    let currentVideoTime: number = this.player.getCurrentTime();
    this.intervalId = setInterval(() => {
      currentVideoTime -= 10;
      this.player.seekTo(currentVideoTime, true);
    }, 1000);
  }

  // rewind() {
  //   const currentTime = this.player.getCurrentTime();
  //   if (currentTime > 10) {
  //     this.player.seekTo(currentTime - 10, true);
  //     this.player.playVideo();
  //   } else {
  //     this.player.seekTo(0, false);
  //     this.player.playVideo();
  //   }
  // }

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
}
