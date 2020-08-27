
import { PeerGroupService } from './services/api/peer-group.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Survey } from './common/types/survey.type';

export enum StateEnum { default, add, list }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {

  hasPeerGroups: boolean = false;
  State = StateEnum;
  state = this.State.default; 

  constructor(private readonly apiService: PeerGroupService) { 
  }
  handleAddNew() {
    this.state = this.State.add;
  }
  handleBack() {
    if (this.hasPeerGroups)  this.state = this.State.list; 
    this.state = this.State.default;

  }
  error() {
    throw new Error('Required');
  }

  api() {
    this.apiService.method1Call();
  }
}  
