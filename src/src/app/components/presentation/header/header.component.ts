import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { StateEnum } from 'src/app/common/types';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	@Output() onAddNew = new EventEmitter();
	@Output() onBack = new EventEmitter();
	@Output() onSearch = new EventEmitter<string>();
  showInfo: boolean = false;
  @Input() isAddNew: boolean;
  @Input() state: StateEnum;
  @Input() isHighlighted: boolean;
  State = StateEnum;
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
  handleSearch(searchText){
    this.onSearch.emit(searchText);
  }
}
