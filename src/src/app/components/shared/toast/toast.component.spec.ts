import { async } from '@angular/core/testing';
import { ToastService } from 'src/app/common/services/toaster.service';

import { ToastComponent } from './toast.component';

describe('ToasterComponent', () => {
  let component: ToastComponent;  
  beforeEach(async(() => {
    
  }));

  beforeEach(() => {     
    component = new ToastComponent({} as ToastService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
