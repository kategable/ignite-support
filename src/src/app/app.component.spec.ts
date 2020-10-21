import { async } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { PeerGroupFacadeService } from './services/api/peer-group-facade.service';


describe('App Component', () => {
  let component: AppComponent; 
  class MockPeerGroupFacadeService {

    isAdd$ = of(false);
    isDefaultView$ = of(true);
  }
  beforeEach(async(() => {
    
  }));

  beforeEach(() => {
    
    
    component = new AppComponent({} as PeerGroupFacadeService);
  });

  it('should create',()=> {
    expect(component).toBeTruthy();
  });

  it('should be in default view',()=> {
   // expect(component.isAdd$).and.toBeTruthy();
  });


  it('should not be in add new view',()=> {
    // expect(component.isAdd$).and.toBeTruthy();
   });
 

});
