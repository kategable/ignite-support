import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-silentrenew-callback',
  template: `<div></div>`
})
export class SilentrenewCallbackComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
	  this.authService.completeSilentrenew();
  }

}
