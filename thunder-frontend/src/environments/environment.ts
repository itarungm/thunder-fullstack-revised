// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SERVER_URL: 'http://localhost:8080/',
  VERIFICATION_URL: `${window.location.host}/verify-email`,
  FORGOT_PASSWORD_URL: `${window.location.host}/forgot-password`,
  LINK_TREE_VIEWER_URL: `${window.location.protocol}//${window.location.host}/link-tree`,
  SECRET:'thunder',
  IMAGE_HOST_URL: `https://storage.googleapis.com/thunder-official.appspot.com/`,
  JSON_CRYPTO_SECRET: "d71ec08e16cf9ee8772a9356914e0a7c2543ca82dc0e670cc6051f8dd7d4bc770c4e3d6ac0aa5d998823f5f05174c95a"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown. 
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
