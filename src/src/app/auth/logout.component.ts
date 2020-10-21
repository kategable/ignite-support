import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-logout',
  template: `<div></div>`
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
	  this.authService.logout();
  }

}
