import { async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { PeerGroupFacadeService } from 'src/app/services/api/peer-group-facade.service';
import { AsyncNameExistsValidator } from 'src/app/util/validators/async-name-exists.validator';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  

  beforeEach(async(() => {
   
  }));

  beforeEach(() => {
   
    component = new CreateComponent({} as PeerGroupFacadeService,{} as FormBuilder, {} as AsyncNameExistsValidator);
  });

  
});
