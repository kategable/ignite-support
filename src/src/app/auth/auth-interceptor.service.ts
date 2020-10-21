import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	  if(environment.mode == "demo"){
		return next.handle(req);
	  }
    if (req.url.startsWith(environment.apiUrl)) {
		if(environment.name!="portal") {
			return from(this.authService.getAccessToken().then(token => {
				const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
				const authReq = req.clone({ headers });
				return next.handle(authReq).pipe(tap(_ => { }, error => {
				var respError = error as HttpErrorResponse;
				if (respError && (respError.status === 401 || respError.status === 403)) {
					this.router.navigate(['/unauthorized']);
				}
				})).toPromise();
			}));
		}
		else {
			let authToken: string = '';
			let nameEQ: string = "pg_access_token=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) {
					authToken = c.substring(nameEQ.length, c.length);				   
				}
			}
			let headers = req.headers.set('Accept', 'application/json')
				.set('Authorization', 'Bearer ' + authToken);
				
			const authReq = req.clone({headers});
			return next.handle(authReq);			
		}
    }
    else {
      return next.handle(req);
    }
  }
}