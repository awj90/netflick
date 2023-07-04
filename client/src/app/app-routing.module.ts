import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { authGuard } from './utils/auth-guard';
import { MoviesComponent } from './components/movies.component';
import { MovieDetailsComponent } from './components/movie-details.component';
import { MoviePlayerComponent } from './components/movie-player.component';
import { LoginComponent } from './components/login.component';
import { DonationFormComponent } from './components/donation-form.component';

const appRoutes: Routes = [
  { path: 'donate', component: DonationFormComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'movie/:id/player',
    component: MoviePlayerComponent,
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired: authGuard },
  },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'movies', component: MoviesComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: '**', redirectTo: '/movies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
