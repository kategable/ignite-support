import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Injectable()
export class AuthRouteGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if(environment.name==='portal' || environment.mode =="demo") {
			return true;
		}
		else {
			return this.authService.isLoggedIn().then(result=>{
				return result;
			});
		}
    }
}