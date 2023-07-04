import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { YouTubePlayerModule } from '@angular/youtube-player';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies.component';
import { MovieDetailsComponent } from './components/movie-details.component';

import { MovieService } from './services/movie.service';
import { HandGestureService } from './services/hand-gesture.service';
import { MoviePlayerComponent } from './components/movie-player.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailsComponent,
    MoviePlayerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    YouTubePlayerModule,
  ],
  providers: [MovieService, HandGestureService],
  bootstrap: [AppComponent],
})
export class AppModule {}
