
import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeerGroup, StateEnum } from './common/types';
import { PeerGroupFacadeService } from './services/api/peer-group-facade.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {

  State = StateEnum;
  isDefaultView$ = this.facadeService.isDefaultView$;
  filteredGroups$ = this.facadeService.peerGroups$;
  state$ = this.facadeService.state$; 
  searchText: any;
  constructor(private readonly facadeService: PeerGroupFacadeService) {
  }

  handleAddNew() {
    this.facadeService.gotoCreate();
  }

  filterGroups(searchText) {
    this.searchText = searchText;
    this.facadeService.handlePeerGroupSearch(searchText);   
  }

}  
