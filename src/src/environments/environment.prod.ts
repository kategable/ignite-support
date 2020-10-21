import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  name: 'prod',
  logLevel: NgxLoggerLevel.ERROR, //ERROR,
  serverLogLevel: NgxLoggerLevel.OFF,
  apiUrl:'#{apiUrl}#',// 'http://localhost:50001', // Replace with remote API
 // coreApiUrl: '#{ }#',// 'http://localhost:50002',
  openIdConnectSettings: {
    authority: '#{authority}#',//'http://clawidap5577.devaonnet.aon.net/SitHCSIdentityProvider/',
    client_id: '#{client_id}#', 
    redirect_uri: '#{redirect_uri}#',//'https://localhost:4200/signin-oidc',
    scope: '#{scope}#',
    response_type: 'code',
    post_logout_redirect_uri: '#{post_logout_redirect_uri}#',//'https://localhost:4200/',
    automaticSilentRenew: true,
    silent_redirect_uri: '#{silent_redirect_uri}#'//,'https://localhost:4200/redirect-silentrenew'
  },
  mode:""
};
