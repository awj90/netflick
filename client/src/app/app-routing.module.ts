import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { authGuard } from './utils/auth-guard';
import { formGuard } from './utils/form-guard';
import { MoviesComponent } from './components/movies.component';
import { MovieDetailsComponent } from './components/movie-details.component';
import { MoviePlayerComponent } from './components/movie-player.component';
import { LoginComponent } from './components/login.component';
import { DonationFormComponent } from './components/donation-form.component';
import { MovieCategoriesComponent } from './components/movie-categories.component';
import { LandingPageComponent } from './components/landing-page.component';

const appRoutes: Routes = [
  {
    path: 'donate',
    component: DonationFormComponent,
    canDeactivate: [formGuard],
  },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'movie/:id/player',
    component: MoviePlayerComponent,
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired: authGuard },
  },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'movie-genres/:genre', component: MoviesComponent },
  { path: 'movie-genres', component: MovieCategoriesComponent },
  { path: '', component: LandingPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
