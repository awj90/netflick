import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map, tap } from 'rxjs';

declare var YT: any;

@Component({
  selector: 'app-movie-player',
  templateUrl: './movie-player.component.html',
  styleUrls: ['./movie-player.component.css'],
})
export class MoviePlayerComponent implements OnInit {
  player: any;
  loading: boolean = true;
  sanitizedUrl!: SafeResourceUrl;
  movieTitle!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const movieId: number = +this.activatedRoute.snapshot.params['id'];
    this.getMovieById(movieId);
    this.initYT();
  }

  initYT() {
    this.player = new YT.Player('player', {
      videoId: 'zcAalMeaKso',
      playerVars: {
        autoplay: 1,
        controls: 1,
        start: 1,
        rel: 0,
        fs: 1,
        modestbranding: 1,
        playsinline: 0,
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
      },
    });
  }

  onPlayerReady(event: any) {
    // Player is ready
    event.target.playVideo();
  }

  getMovieById(id: number) {
    this.movieService
      .getMovieById(id)
      .pipe(
        tap((movie) => (this.movieTitle = movie.title)),
        map((movie) => movie.video_id)
      )
      .subscribe((id) => {
        this.sanitizedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${id}`
        );
        this.loading = false;
      });
  }
}
