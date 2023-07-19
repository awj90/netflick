export default {
  oidc: {
    issuer: 'https://dev-50458755.okta.com/oauth2/default',
    clientId: '0oaa0qs617MRs7gfl5d7',
    redirectUri: window.location.origin + '/login/callback',
    // redirectUri: 'https://netflick-store.netlify.app/login/callback',
    // redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  },
};
