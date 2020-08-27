import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  apiUrl: 'http://api.myservice.com/api/', // Replace with remote API
  logLevel: NgxLoggerLevel.ERROR,
  serverLogLevel: NgxLoggerLevel.ERROR
};
