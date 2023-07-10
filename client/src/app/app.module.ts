import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies.component';
import { MovieDetailsComponent } from './components/movie-details.component';
import { MoviePlayerComponent } from './components/movie-player.component';
import { LoginComponent } from './components/login.component';
import { AuthStatusComponent } from './components/auth-status.component';
import { DonationFormComponent } from './components/donation-form.component';

import { OktaAuthModule, OktaConfig } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import { MovieService } from './services/movie.service';
import { HandGestureService } from './services/hand-gesture.service';
import { LocationService } from './services/location.service';
import { PaymentService } from './services/payment.service';

import appConfig from './configs/app-config';

import { MaterialModule } from './material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { NgrokInterceptorService } from './services/ngrok-interceptor.service';
import { MovieCategoriesComponent } from './components/movie-categories.component';

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
    DonationFormComponent,
    MovieCategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    YouTubePlayerModule,
    MaterialModule,
    OktaAuthModule.forRoot(moduleConfig),
  ],
  providers: [
    MovieService,
    HandGestureService,
    LocationService,
    PaymentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgrokInterceptorService,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'auto' },
    },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
