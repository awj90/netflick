import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies.component';
import { MovieDetailsComponent } from './components/movie-details.component';
import { MoviePlayerComponent } from './components/movie-player.component';
import { LoginComponent } from './components/login.component';
import { AuthStatusComponent } from './components/auth-status.component';

import { OktaAuthModule, OktaConfig } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import { MovieService } from './services/movie.service';
import { HandGestureService } from './services/hand-gesture.service';

import appConfig from './configs/app-config';

const oktaConfig = appConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);
const moduleConfig: OktaConfig = { oktaAuth };

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailsComponent,
    MoviePlayerComponent,
    LoginComponent,
    AuthStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    YouTubePlayerModule,
    OktaAuthModule.forRoot(moduleConfig),
  ],
  providers: [MovieService, HandGestureService],
  bootstrap: [AppComponent],
})
export class AppModule {}
