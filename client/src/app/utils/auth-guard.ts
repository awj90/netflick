import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth } from '@okta/okta-auth-js';

// route guard to navigate user to login page when accessing protected resources (the movie) and not logged in
export function authGuard(oktaAuth: OktaAuth, injector: Injector) {
  const router = injector.get(Router);
  router.navigate(['/login']);
}
