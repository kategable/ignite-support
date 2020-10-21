import { Component, OnInit } from '@angular/core';
import { PeerGroupService } from 'src/app/services/api/peer-group.service';
import { Survey } from 'src/app/common/types/survey.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html'
})
export class ApiTestComponent implements OnInit {

  surveys$: Observable<object>;

  constructor(private apiService:PeerGroupService) { 
  }

  ngOnInit(): void {
	console.log("ApiTest");
	this.surveys$ =this.apiService.getTestData();
  }

}
