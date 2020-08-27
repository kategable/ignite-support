import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	@Output() onAddNew = new EventEmitter();
	@Output() onBack = new EventEmitter();
 
  showInfo: boolean = false;
  isAddNew: boolean = false;

  constructor() {  }

  addNew() { 
    this.onAddNew.emit();
    this.isAddNew = true;
  }

  back() { 
    this.onBack.emit();
    this.isAddNew = false;
  }

  openInfo() {
    this.showInfo = true;
  }

  hideInfo() {
    this.showInfo = false;
  }
}
