import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from 'src/app/common/types';

@Component({
  selector: 'app-selected-company-list',
  templateUrl: './selected-company-list.component.html',
  styleUrls: ['./selected-company-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SelectedCompanyListComponent  {

  constructor() { }
  @Input() list: Company[];
  @Output() onClearOneSelection = new EventEmitter<Company>();

  
  trackByFn(index: number, item: Company) {
    return item.clientId;
  }
  handleClearSelection(company: Company){
    this.onClearOneSelection.emit(company);
  }
 
}
