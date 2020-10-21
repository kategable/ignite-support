import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './app-start.component.html'
})
export class AppStartComponent implements OnInit {

environment = environment;
isLoggedIn = false;

constructor(private authService: AuthService) {
	this.authService.loginChanged.subscribe(loggedIn => {
		this.isLoggedIn = loggedIn;
	})
	}

  ngOnInit(): void {
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
