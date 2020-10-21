import { async} from '@angular/core/testing';

import { CompanyListComponent } from './company-list.component';

describe('CompanyListComponent', () => {
  let component: CompanyListComponent;
 
  beforeEach(async(() => {
  
  }));

  beforeEach(() => {
  
    component = new CompanyListComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
