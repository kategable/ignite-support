import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  private userManager: UserManager;
  private user: User;
  private loginChangedSubject = new Subject<boolean>();

  loginChanged = this.loginChangedSubject.asObservable();

  constructor() {
    this.userManager = new UserManager(environment.openIdConnectSettings);
    this.userManager.events.addAccessTokenExpired(_ => {
      this.loginChangedSubject.next(false);
	});
	
    this.userManager.events.addUserLoaded(user => {
      if (this.user !== user) {
        this.user = user;
        this.loginChangedSubject.next(!!user && !user.expired);
      }
	});
	
	this.userManager.events.addUserUnloaded(() => {
		if (!environment.production) {
		  console.log('User unloaded');
		}
		this.user = null;
		this.loginChangedSubject.next(false);
	  });
  }

  login() {
    return this.userManager.signinRedirect();
  }

  isLoggedIn(): Promise<boolean> {
    return this.userManager.getUser().then(user => {
      const userCurrent = !!user && !user.expired;
      if (this.user !== user) {
        this.loginChangedSubject.next(userCurrent);
      }
      this.user = user;
      return userCurrent;
    });
  }

  completeLogin() {
    return this.userManager.signinRedirectCallback().then(user => {
		if(!environment.production) {
			console.log('Callback after signin handled', user);
		}
      this.user = user;
      this.loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  logout() {
    this.userManager.signoutRedirect();
  }

//   completeLogout() {
//     this.user = null;
//     this.loginChangedSubject.next(false);
//     return this.userManager.signoutRedirectCallback();
//   }

  completeSilentrenew() {
    return this.userManager.signinSilentCallback().then(_ => {
		if (!environment.production) {
			console.log('Callback after silent signin handled.');
		  }
    });
  }

  getAccessToken() {
    return this.userManager.getUser().then(user => {
      if (!!user && !user.expired) {
        return user.access_token;
      }
      else {
        return null;
      }
    });
  }

}