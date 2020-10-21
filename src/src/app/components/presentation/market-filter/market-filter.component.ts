import {
	Component,
	Input,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
	OnChanges,
	ViewChild,
} from '@angular/core';
import { IgxExpansionPanelComponent } from '@infragistics/igniteui-angular';
import {
	FiltersRequest,
	SurveyFilter,
	SurveyFilterValue,
} from 'src/app/common/types';
import { MarketFiltersChanges } from 'src/app/common/types/market-filters-changes.interface';

@Component({
	selector: 'app-market-filter',
	templateUrl: './market-filter.component.html',
	styleUrls: ['./market-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketFilterComponent {
	@Input() filterData: SurveyFilter[];
	@Input() selectedFilters: SurveyFilter[];
	@Input() breakoutFilterList: FiltersRequest[];
	@Output() onSelectedFiltersChange = new EventEmitter<SurveyFilter[]>();
	@Output() onReset = new EventEmitter();
	@Output() onRefine = new EventEmitter();

	@ViewChild(IgxExpansionPanelComponent, {
		read: IgxExpansionPanelComponent,
		static: false,
	})
	public panel: IgxExpansionPanelComponent;

	selectedItems: SurveyFilterValue[] = [];
	initValue = false;
	constructor() {}
	ngOnChanges(changes: MarketFiltersChanges) {
		if (changes.filterData) {
			if (changes.filterData.firstChange) {
				this.initiateFilterSelection();
			}
			this.initiateFilterUnSelection();
		}
	}

	private initiateFilterUnSelection() {
		for (let filter of this.filterData) {
			filter.selectedValues = [];
			let item = this.selectedFilters.find(x => x.id === filter.id);
			if (item) {
				filter.selectedValues = item.selectedValues;
			}
		}
	}

	initiateFilterSelection() {
		if (!this.selectedFilters) {
			this.selectedFilters = [];
		}
		this.filterData.map((filter: SurveyFilter) => {
			if (filter.selectedValues?.length > 0) {
				this.selectedFilters.push({
					id: filter.id,
					filterScope: filter.filterScope,
					selectedValues: filter.selectedValues,
				} as SurveyFilter);
			} else {
				filter.selectedValues = [];
			}
		});
	}

	handleSelectedItemsChange(filter, event) {
		let fromList = this.selectedFilters.find(item => item.id === filter.Id);
		if (!fromList) {
			fromList = filter;
			this.selectedFilters.push({
				id: filter.id,
				filterScope: filter.filterScope,
				selectedValues: event,
			} as SurveyFilter);
		} else {
			fromList.selectedValues = event;
		}
		this.onSelectedFiltersChange.emit(this.selectedFilters);
	}
	resetSelectedFilter() {
		this.selectedFilters = [];
		this.initiateFilterUnSelection();
		this.onReset.emit();
	}

	isTree(filter: SurveyFilter): boolean {
		let tree =
			filter.name === 'Industry' ||
			filter.name === 'Region / City' ||
			filter.name === 'Ownership Type';
		return tree;
	}

	handleCollapsed(e) {
		e.cancelBubble = true;
	}
	getWidth(filter): string {
		if (this.isTree(filter)) return '400px';
		return '';
	}
	refine() {
		if (this.selectedFilters.length > 0) this.onRefine.emit();
	}
}
