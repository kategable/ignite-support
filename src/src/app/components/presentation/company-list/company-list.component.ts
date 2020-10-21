import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output,HostListener } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
 
import { Company } from 'src/app/common/types';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

}) 
export class CompanyListComponent {
  @Input() list: Company[]
  @Output() onChangeSelection = new EventEmitter<Company>();
  public company : Company;
  private popOver: NgbPopover;
  constructor() { }
  @HostListener('click', ['$event'])
   handleClickEvent(event) { 

    if (event.srcElement.attributes.getNamedItem("closeOnClick")) {
      this.popOver.close();
    }
   }


  trackByFn(index: number, item: Company) {
    return item.clientId;
  }
  handleChangeSelection(company:Company){ 
    this.onChangeSelection.emit(company);
  }



public shouldHideInfoDot(popOver: NgbPopover) {
  if (popOver.isOpen()) return ""  
  
  return "far fa-info-circle popoverIcon dispaly-block-inline";
}

public shouldHideScrollBar(popOver: NgbPopover) {
  if (popOver.isOpen()) {
    return "scroll-panel-hide"  
  }
  return "scroll-panel";
}

  public show(company:Company, popOver: NgbPopover) {
    this.popOver = popOver;
    this.company = company;
    popOver.open();
  } 

} 
