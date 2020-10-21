// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false, 
  name: 'local',
  apiUrl: 'http://localhost:50001', // Replace with local API
  openIdConnectSettings: {
    authority: 'http://clawidap5577.devaonnet.aon.net/DevHCSIdentityProvider/',
    client_id: 'peergroupspa', 
    redirect_uri: 'http://localhost:4200/#/signin-callback',
    scope: 'openid profile peergroup.api',
    response_type: 'code',
    post_logout_redirect_uri: 'http://localhost:4200',
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:4200/#/silentrenew-callback'
  },
  logLevel: NgxLoggerLevel.DEBUG,
  serverLogLevel: NgxLoggerLevel.OFF, //turn it on to see the logs in the file  
  mode: ''
};
  

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
