import { Component, Input } from "@angular/core";

@Component({
    selector: "app-list",
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
}) 

export class ListComponent  {
    isLanding: Boolean = true; 
    hasPeerGroups: Boolean = false;
    isCreatingPeerGroup: Boolean = false;

  
  
}
