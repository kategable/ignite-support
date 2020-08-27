import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/common/types/country.type';
import { Survey } from 'src/app/common/types/survey.type';
import { PeerGroupService } from 'src/app/services/api/peer-group.service';
import { groupBy, map, mergeMap, reduce } from 'rxjs/operators';
import { Zone } from 'src/app/common/types/zone.type';
@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  selectedSurvey: Survey;  
  selectedCountries: Country[];  
  surveys$: Observable<Survey[]> = this.apiService.getSurveys();
  selectedCountries$: Observable<Country[]> = this.apiService.selectedCountries$;
  zones$:Observable<Zone[]> = this.apiService.zones$;
  peerGroupName: any;
 
  constructor(private readonly apiService: PeerGroupService) {
  }

  ngOnInit(): void {
    
  }

  handleSelectedSurvey(survey: Survey) {
    this.selectedSurvey = survey;
    this.apiService.selectSurvey(survey);     
  }
  handleSelectedCountry(country: Country[]) {
   this.selectedCountries = country;
  }

  allSelected(): boolean{
    return this.selectedSurvey && this.selectedCountries?.length> 0  && this.peerGroupName?.length > 1;
  }
}
