import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { PeerGroupService } from './peer-group.service';
import { Router } from '@angular/router';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import {
	PeerGroup,
	StateEnum,
	SurveyFilter,
	Survey,
	Country,
	Company,
	FiltersRequest,
} from 'src/app/common/types';
import { $ } from 'protractor';

@Injectable({
	providedIn: 'root',
})
export class PeerGroupFacadeService {
 
	private readonly isDefaultViewSubject = new BehaviorSubject<boolean>(true);
	public readonly isDefaultView$ = this.isDefaultViewSubject.asObservable();

	private readonly selectedCountriesSubject = new BehaviorSubject<Country[]>(
		[]
	);
	readonly selectedCountries$ = this.selectedCountriesSubject.asObservable();

	private readonly selectedFiltersSubject = new BehaviorSubject<FiltersRequest[]>([]);
	readonly selectedFilters$ = this.selectedFiltersSubject.asObservable();

	private readonly selectedSurveySubject = new BehaviorSubject<Survey>(null);
	selectedSurvey$ = this.selectedSurveySubject.asObservable();

	private searchCompaniesAction$ = new BehaviorSubject<string>(null);
	private selectedCompaniesSubject = new BehaviorSubject<Company[]>([]);
	selectedCompanies$ = this.selectedCompaniesSubject.asObservable();
	private searchPeerGroupsAction$ = new BehaviorSubject<string>(null);

	constructor(
		private readonly apiService: PeerGroupService,
		private router: Router
	) {}
	surveys$ = this.apiService.getSurveys();
	searchColumns = ['peerGroupDisplayName','surveyCode','surveyName','createdByName' ]
	allPeerGroups$ = this.apiService.getPeerGroups();
	peerGroups$ = combineLatest([
		this.allPeerGroups$,
		this.searchPeerGroupsAction$,
	]).pipe(
		map(([groups, searchText]) => {
			if (searchText) {
				groups = groups.filter(group => {
					let matchFound = false;
					this.searchColumns.map(column=>{
						if(group[column]) {
							matchFound = (matchFound || group[column].toString().trim().toLowerCase().indexOf(searchText.trim().toLowerCase()) !== -1)
						}
					});	
					matchFound = (matchFound || group.companies?.some(company=> company.name.toString().trim().toLowerCase().indexOf(searchText.trim().toLowerCase()) !== -1));
					return matchFound;
				});
			}
			groups.map(g=>g.disabledLook = g.statusId===3 || g.statusId ===-1);
			return [...groups];
		}),
		shareReplay(1)
	);
	state$: Observable<StateEnum> = this.allPeerGroups$.pipe(
		map(groups => {
			return groups?.length > 0 ? StateEnum.list : StateEnum.default;
		})
	);
	isNameExists$(value: string): Observable<boolean> {
		return this.apiService.isPeerGroupNameExists(value);
	}
	initCreateNew() {
		this.selectedCountriesSubject.next([]);
	}
	selectCountries(countries: Country[]) {
		if(countries?.length === 0){
			this.resetAll(false);
			return;
		}
		this.selectedCountriesSubject.next(countries);
	}

	selectSurvey(survey: Survey): void {
		this.resetAll();
		this.selectedSurveySubject.next(survey);
	}

	gotoCreate() {
		this.router.navigate(['/create']);
	}
	goHome() {
		this.router.navigate(['/']);
		this.resetAll();
  }

	goToReview() {
		// need to call API
	}

	handleFullyReadyToCreate() {
		this.isDefaultViewSubject.next(false); 
		this.selectedFiltersSubject.next([]);

	}

	filters$: Observable<SurveyFilter[]> = combineLatest([
		this.selectedSurvey$,
		this.selectedCountries$,
	]).pipe(
		switchMap(([selectedSurvey, selectedCountries]) => {			
			return this.apiService.getFiltersBySurvey(
				selectedSurvey,
				selectedCountries
			);
		}),
		shareReplay(1)
	);

	private allCompanies$: Observable<Company[]> = combineLatest([
		this.selectedSurvey$,
		this.selectedCountries$,
		this.selectedFilters$,
	]).pipe(
		switchMap(([survey, countries, filters]) => {		
			return this.apiService.getCompanies(
				survey,
				countries,
				filters
			);
		})
	);

	companies$:  Observable<Company[]>= combineLatest([
		this.allCompanies$,
		this.searchCompaniesAction$,
		this.selectedCompanies$,
	]).pipe(
		map(([list, searchText, selectedItems]) => {
			if (searchText) {
				list = list.filter(company =>
					company.name.toLowerCase().includes(searchText.toLowerCase())
				);
			}
			list.map(
				i => (i.selected = selectedItems.some(item => item.clientId === i.clientId))
			);
			return [...list];
		}),
		shareReplay(1)
	);

	selectAllCompanies(filteredCompanies: Company[]) {
		let list = this.selectedCompaniesSubject.getValue();
		this.selectedCompaniesSubject.next([...filteredCompanies.concat(list)]);
	}
	clearSelectedCompanies() {
		this.selectedCompaniesSubject.next([]);
	}

	changeSelectedCompany(changed: Company) {
		changed.selected = !changed.selected;
		let list = this.selectedCompaniesSubject.getValue();

		if (changed.selected) {
			this.selectedCompaniesSubject.next([changed, ...list]);
		} else {
			this.selectedCompaniesSubject.next([
				...list.filter(i => i.clientId !== changed.clientId),
			]);
		}
	}

	countriesBySurvey$ = this.selectedSurvey$.pipe(
		map(selectedSurvey => this.setRegions(selectedSurvey)),
		shareReplay(1)
	);

	setRegions(filterBy: Survey): Country[] {
		if (!filterBy) {
			this.selectedCountriesSubject.next([]);
			return [];
		}
		let countries = filterBy.countries.filter(i => i.parentId !== -1);
		if (countries.length === 1) {
			let one = countries[0];
			this.selectedCountriesSubject.next([]);
			return [one];
		} else {
			this.selectedCountriesSubject.next([]);
			return filterBy.countries;
		}
	}

	selectFilters(request: FiltersRequest[]) {
		this.selectedFiltersSubject.next(request);
		this.selectedCompaniesSubject.next([]);
	}

	handleCompanySearch(searchText: any) {
		this.searchCompaniesAction$.next(searchText);
	}
	resetAll(includeSurvey: boolean = true) {
		if(includeSurvey){
			this.selectedSurveySubject.next(null);	
		}
		this.selectedFiltersSubject.next([])
		this.searchCompaniesAction$.next(null);
		this.selectedCompaniesSubject.next([]);
		this.isDefaultViewSubject.next(true);
	}
 

	handlePeerGroupSearch(searchText: any) {
		this.searchPeerGroupsAction$.next(searchText);
	}
}
