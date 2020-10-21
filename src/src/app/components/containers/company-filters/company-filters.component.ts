import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from 'src/app/common/types';
import { PeerGroupFacadeService } from 'src/app/services/api/peer-group-facade.service';

@Component({
  selector: 'app-company-filters',
  templateUrl: './company-filters.component.html',
  styleUrls: ['./company-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFiltersComponent {
  
  searchText: string = '';
  constructor(private readonly facadeService: PeerGroupFacadeService) {}
 
  
  @Output() onNavigationToReview = new EventEmitter();

  filteredCompanies$: Observable<Company[]> = this.facadeService.companies$;
  selectedCompanies$: Observable<Company[]> = this.facadeService.selectedCompanies$;

  selectAll(filteredCompanies: Company[]) {
    if(filteredCompanies.filter(i=>!i.selected).length > 0){
      this.facadeService.selectAllCompanies(filteredCompanies.filter(i=>!i.selected));
    }      
  }
  clearSelection() {
    this.facadeService.clearSelectedCompanies();
  }

  handleChangeSelection(company: Company) {
    this.facadeService.changeSelectedCompany(company);
  }
  handleClearOneSelection(company: Company) {
    this.facadeService.changeSelectedCompany(company);
  }
  handleSearch(searchText) {
    this.searchText = searchText; 
    this.facadeService.handleCompanySearch(searchText);

  }
  navigateToReview($event) {
    this.facadeService.goToReview();
    this.onNavigationToReview.emit();
  }
  reset(){
    this.facadeService.resetAll();
  }
}
