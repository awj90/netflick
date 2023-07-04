import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import appConfig from '../configs/app-config';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  oktaSignIn: any;

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {
    this.oktaSignIn = new OktaSignIn({
      logo: 'assets/logo.png',
      features: {
        registration: true,
      },
      baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
      clientId: appConfig.oidc.clientId,
      redirectUri: appConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: appConfig.oidc.issuer,
        scopes: appConfig.oidc.scopes,
      },
      idps: [{ type: 'google', id: '0oaa4ln3j3jNcmCFR5d7' }],
    });
  }

  ngOnInit(): void {
    this.oktaSignIn.renderEl(
      {
        el: '#okta-log-in-widget',
      },
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }

  ngOnDestroy(): void {
    this.oktaSignIn.remove();
  }
}
