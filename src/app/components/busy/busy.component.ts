import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BusyService } from 'src/app/common/services/busy.service';
import { BusyState } from 'src/app/common/interfaces/busy-state.interface';

@Component({
  selector: 'app-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class BusyComponent  {

  busyState$ = new Observable<BusyState>();
  constructor(busyService: BusyService) {
    this.busyState$ = busyService.busyState$;
    
   }



}
