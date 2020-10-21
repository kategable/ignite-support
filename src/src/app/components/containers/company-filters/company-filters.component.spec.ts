import { async } from '@angular/core/testing';
import { PeerGroupFacadeService } from 'src/app/services/api/peer-group-facade.service';

import { CompanyFiltersComponent } from './company-filters.component';

describe('CompanyFiltersComponent', () => {
  let component: CompanyFiltersComponent;
 
  beforeEach(async(() => {
   
  }));

  beforeEach(() => { 
    component = new CompanyFiltersComponent({} as PeerGroupFacadeService);
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
