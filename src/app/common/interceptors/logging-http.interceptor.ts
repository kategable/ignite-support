import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { ToastService } from '../services/toaster.service';

@Injectable()
export class LoggingHttpInterceptor implements HttpInterceptor {
  constructor(private readonly logger: NGXLogger, private readonly toastService: ToastService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //  this.logger.debug({ request });
    //this.toastService.propogate(false, request.method) // add it back to see in the toaster

    return next.handle(request).pipe( 
      tap(
        response=>{},
        error => {
          this.logger.warn(error); // not setting it to error so it will not send back to api
          this.toastService.propogate(true,"failed to load")
        }
      )
    );
  }
}
