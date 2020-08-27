import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/common/services/toaster.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Survey } from 'src/app/common/types/survey.type';
import { map, reduce, tap } from 'rxjs/operators';
import { ReturnListViewModel } from 'src/app/common/types/result.type';
import { Country } from 'src/app/common/types/country.type';
import { Zone } from 'src/app/common/types/zone.type';
 

@Injectable({
  providedIn: 'root'
})
export class PeerGroupService {


  private readonly zonesSubject = new BehaviorSubject<Zone[]>([]);
  private readonly zonesForSurveySubject = new BehaviorSubject<Zone[]>([]);
  readonly zones$ = this.zonesForSurveySubject.asObservable();

  private readonly selectedCountriesSubject= new BehaviorSubject<Country[]>([]);
  readonly selectedCountries$ = this.selectedCountriesSubject.asObservable();
  sub: any;

  constructor(private readonly httpClient: HttpClient, private readonly toastService: ToastService) {
    this.loadZones();
  }
  method1Call(): void {
    this.httpClient.get("https://jsonplaceholder.typicode.com/users").subscribe(
      success => {
        this.toastService.propogate(false, "Successfully Completed");
      }
    );
  }

  getSurveys(): Observable<Survey[]> {
    return this.httpClient.get<ReturnListViewModel<Survey>>('/assets/test-data/surveys.json').pipe(
      tap(d => this.toastService.propogate(false, "surveys loaded")),
      map(data => data.results)
    );
  }

  loadZones():  void {
  this.sub =  this.httpClient.get<ReturnListViewModel<Zone>>('/assets/test-data/zones-countries.json').pipe(
      tap(data => {
        this.toastService.propogate(false, "countries loaded");        
      })
    ).subscribe(data=>{
      this.zonesSubject.next(data.results);
    });
    
  }

  selectSurvey(survey: Survey): void {
    let zones = this.zonesSubject.getValue();
    zones = zones.reduce(
          (filtered: Zone[], zone: Zone) => {
            const countries = zone.countries.filter(c=>c.surveyCodes.find(s=>s==survey.code));            
            if (countries.length > 0) {
              zone.countries = countries;
              filtered.push(zone);
            }
            return filtered;
          }, []);
     
    this.zonesForSurveySubject.next(zones);
    this.selectedCountriesSubject.next([]);
  }
}
