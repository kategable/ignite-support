import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../../common/services/toaster.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AssetUrlPipe } from '../../common/pipes';
import {
	PeerGroup,
	SurveyFilter,
	Country,
	ReturnListViewModel,
	Survey,
	Company,
	FiltersRequest,
} from 'src/app/common/types';
import { mockCompaniesFactory } from 'src/assets/test-data/test-companies';
import { mockPeerGroupsFactory } from 'src/assets/test-data/test-groups';
@Injectable({
	providedIn: 'root',
})
export class PeerGroupService {
	constructor(
		private readonly httpClient: HttpClient,
		private readonly toastService: ToastService,
		private assetUrl: AssetUrlPipe
	) {}

	getSurveys(): Observable<Survey[]> {
		let url = `${environment.apiUrl}/survey`;
		if (environment.mode == 'demo') {
			url = this.assetUrl.transform('/test-data/surveys.json');
		}
		return this.httpClient.get<ReturnListViewModel<Survey>>(url).pipe(
			tap(d => this.toastService.propogate(false, 'surveys loaded')),
			map(data => data.results)
		);
	}

	getTestData(): Observable<object> {
		return this.httpClient.get<object>(`${environment.apiUrl}/testdata`);
	}

	isPeerGroupNameExists(value: string): Observable<boolean> {
		if (environment.mode == 'demo') {
			return of(false);
		}
		return this.httpClient.get<boolean>(
			`${
				environment.apiUrl
			}/PeerGroup/isPeerGroupNameExists/${value.trim()}?v=${new Date().getTime()}`
		);
	}
	
	getFiltersBySurvey(
		selectedSurvey: Survey,
		selectedCountries: Country[]
	): Observable<SurveyFilter[]> {

		if (!selectedSurvey || !selectedCountries) return of([]);		
		let countries = selectedCountries.filter(i => i.parentId !== -1);
		if (environment.mode == 'demo') {
			return this.httpClient
				.get<ReturnListViewModel<SurveyFilter>>(
					this.assetUrl.transform('/test-data/filters.json')
				)
				.pipe(
					tap(d =>
						this.toastService.propogate(
							false,
							'demo filters loaded'
						)
					),
					map(data => data.results)
				);
		}

		let body = countries.map(i => i.id);
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
		};
		return this.httpClient
			.post<ReturnListViewModel<SurveyFilter>>(
				`${environment.apiUrl}/Survey/GetFiltersBySurvey/${selectedSurvey.id}`,
				body,
				httpOptions
			)
			.pipe(map(data => data.results));
	}

	getPeerGroups(): Observable<PeerGroup[]> {		 
		if (environment.mode === 'demo') {
			return of(mockPeerGroupsFactory());
		}
		return this.httpClient
			.get<ReturnListViewModel<PeerGroup>>(
				`${environment.apiUrl}/peergroup?v=${new Date().getTime()}`
			)
			.pipe(
				tap(d => this.toastService.propogate(false, 'groups loaded')),
				map(data => data.results)
			);
	}

	getCompanies(
		survey: Survey,
		countries: Country[],
		currentlySelectFilters: FiltersRequest[]
	): Observable<Company[]> {
		if (!survey || countries?.length === 0) return of([]) ;
		if (environment.mode === 'demo') {
			return of(mockCompaniesFactory());
		}
		let body = {
			CountryIds: countries.map(i => i.id),
			FilterValues: currentlySelectFilters,
		};

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
		};
		return this.httpClient
			.post<ReturnListViewModel<Company>>(
				`${environment.apiUrl}/Company/CompaniesBy/${survey.id}`,
				body,
				httpOptions
			)
			.pipe(map(data => data.results));
	}
}
