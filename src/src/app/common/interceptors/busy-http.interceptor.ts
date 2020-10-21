import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

@Injectable()
export class BusyHttpInterceptor implements HttpInterceptor {

  constructor(private readonly busyService: BusyService) { }

  list: [string] = ["isPeerGroupNameExists"];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const message = request.method === 'GET' ? 'Loading...' : 'Saving...';

    let exclude = this.exclude(request.url);
    if (!exclude) {
      this.busyService.increment(message);
    }

    return next.handle(request).pipe(
      finalize(() => {
        if (!exclude) {
          this.busyService.decrement();
        }
      })
    );
  }
  exclude(url: string): boolean {
    return new RegExp(this.list.join("|")).test(url);
  }
}
