import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Subscription } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrls: ['./auth-status.component.css'],
})
export class AuthStatusComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  username!: string;
  hour: number = new Date().getHours() + 1;
  authState$!: Subscription;
  storage: Storage = sessionStorage;

  constructor(
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
    private oktaAuthStateService: OktaAuthStateService
  ) {}

  ngOnInit(): void {
    this.authState$ = this.oktaAuthStateService.authState$.subscribe({
      next: (authState) => {
        this.isAuthenticated = !!authState.isAuthenticated;
        if (this.isAuthenticated) {
          this.oktaAuth.getUser().then((userClaims) => {
            this.username = userClaims.given_name as string;
            const lastName: string = userClaims.family_name as string;
            const email: string = userClaims.email as string;
            this.storage.setItem(
              'user',
              JSON.stringify(new User(this.username, lastName, email))
            );
          });
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
    this.authState$.unsubscribe();
  }

  logout() {
    // clear session storage and sign out
    this.storage.removeItem('user');
    this.oktaAuth.signOut();
  }
}
