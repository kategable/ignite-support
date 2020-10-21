import {
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Country } from 'src/app/common/types/country.type';
import { Survey } from 'src/app/common/types/survey.type';
import {
	debounceTime,
	distinctUntilChanged,
	takeUntil,
} from 'rxjs/operators';
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { AonValidators } from 'src/app/util/validators/aon-pattern.validator';
import { PeerGroupFacadeService } from 'src/app/services/api/peer-group-facade.service';
import { AsyncNameExistsValidator } from 'src/app/util/validators/async-name-exists.validator';
import { FiltersRequest, StateEnum, SurveyFilter } from 'src/app/common/types';
export const ValidationErrorMessage = {
	duplicate: 'Name must be different from existing Peer Group name',
	aonPattern: 'No use of special characters such as !,$,_,:,<, =,>,(,&,...)',
	maxlength: 'Name must be less than 50 characters',
};

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
	selectedSurvey: Survey;
	selectedSurvey$ = this.facadeService.selectedSurvey$;
	selectedCountries: Country[] = [];

	peerGroupForm: FormGroup;
	errorMessage: string = '';

	surveys$: Observable<Survey[]> = this.facadeService.surveys$;
	selectedCountries$: Observable<Country[]> = this.facadeService
		.selectedCountries$;
	zonesForSurvey$: Observable<Country[]> = this.facadeService
		.countriesBySurvey$;
	filters$: Observable<SurveyFilter[]> = this.facadeService.filters$;
	requestFilterList: FiltersRequest[] = [];
	selectedFilters: SurveyFilter[];
	isDefaultView$ = this.facadeService.isDefaultView$;

	state$ = this.facadeService.state$;
	filteredGroups$ = this.facadeService.peerGroups$;
	private ngUnsubscribe: Subject<void> = new Subject<void>();

	isErrorState = false;
	dupMessage: string;
	fullPath: boolean = false;
	reviewEnabled: boolean = false;
	State = StateEnum;
	constructor(
		private readonly facadeService: PeerGroupFacadeService,
		private readonly fb: FormBuilder,
		private asyncNameValidator: AsyncNameExistsValidator
	) {
		this.createForm();
		this.dupMessage = ValidationErrorMessage.duplicate;
	}

	ngOnInit(): void {
		this.facadeService.initCreateNew();

		this.nameControl.valueChanges
			.pipe(
				debounceTime(400),
				distinctUntilChanged(),
				takeUntil(this.ngUnsubscribe)
			)
			.subscribe(val => {
				if (!this.fullPath && val?.length > 0) {
					if (!this.reviewEnabled)
					{
						this.fullPath = true;
						this.facadeService.handleFullyReadyToCreate();
					}
					
				}
				this.setNameValidationMessage(this.nameControl);
				this.isErrorState = this.isNameInErrorState();
			});

		this.isDefaultView$
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe(val => {
				if (val) {
					this.nameControl.setValue('', { emitEvent: false });
					this.nameControl.disable();
					this.fullPath = false;
				}
			});
	}
	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
	createForm() {
		this.peerGroupForm = this.fb.group({
			name: new FormControl(
				{ value: '', disabled: true },
				[
					AonValidators.pattern(),
					Validators.required,
					Validators.maxLength(50),
				],
				[this.asyncNameValidator.existingNameValidator()]
			),
		});
	}

	get nameControl() {
		return this.peerGroupForm.get('name');
	}
	handleSelectedSurvey(survey: Survey) {
		this.selectedSurvey = survey;
		this.selectedCountries = [];

		this.facadeService.selectSurvey(survey);
		this.handleOnReset();
	}
	handleSelectedCountry(countries: Country[]) {
		this.selectedCountries = countries;
		this.facadeService.selectCountries(countries);
		this.setEnableOnName();
		this.isErrorState = this.isNameInErrorState();
	}

	private setEnableOnName() {
		if (this.nameControl.value.length > 0) return;
		if (this.enableName()) {
			this.nameControl.enable();
		}
	}

	enableName(): boolean {
		return this.selectedSurvey && this.selectedCountries?.length > 0;
	}

	setNameValidationMessage(c: AbstractControl): void {
		this.errorMessage = '';
		if ((c.touched || c.dirty) && c.errors) {
			this.errorMessage = Object.keys(c.errors).map(key => {
				return ValidationErrorMessage[key];
			})[0];
		}
	}

	isNameInErrorState(): boolean {
		return (
			(this.selectedCountries.length > 0 &&
				this.nameControl.value.length === 0) ||
			this.errorMessage?.length > 0
		);
	}

	handleselectedFiltersChange(selectedFilters: SurveyFilter[]) {
		this.selectedFilters = selectedFilters;
		this.requestFilterList = this.toRequest(selectedFilters);
	}
	toRequest(filters: SurveyFilter[]) {
		let request = [] as FiltersRequest[];
		filters.map(filter => {
			filter.selectedValues.map(s => {
				let selected = {
					FilterId: filter.id,
					FilterScope: filter.filterScope,
					ValueId: s.id,
				} as FiltersRequest;
				request.push(selected);
			});
		});
		return request;
	}

	handleOnReset() {
		this.selectedFilters = [];
		this.requestFilterList = [];
		this.facadeService.selectFilters([]);
	}

	handleOnRefine() {
		this.facadeService.selectFilters(this.requestFilterList);
	}
	handleBack() {
		this.facadeService.goHome();
	}
	goToReview() {
		if (this.enableName() && this.nameControl.value.length > 0) {
			this.reviewEnabled = true;
		}
	}
}
