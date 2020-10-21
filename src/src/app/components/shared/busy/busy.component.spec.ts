import { async } from '@angular/core/testing';
import { BusyService } from 'src/app/common/services/busy.service';

import { BusyComponent } from './busy.component';

describe('BusyComponent', () => {
  let component: BusyComponent;

  beforeEach(async(() => {
    
  }));

  beforeEach(() => {
   
    component = new BusyComponent({} as BusyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
