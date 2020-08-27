import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';  
import { BusyService } from '../services/busy.service';

@Injectable()
export class BusyHttpInterceptor implements HttpInterceptor {

  constructor(private readonly busyService: BusyService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const message = request.method === 'GET' ? 'Loading...' : 'Saving...';
    this.busyService.increment(message);

    return next.handle(request).pipe(
      finalize(() => {
        this.busyService.decrement();
      })
    );
  }
}
