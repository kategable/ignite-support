import { Component,  Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {
	@Output() onSearch = new EventEmitter<string>();
	@Input() isHighlighted: boolean;
	debouncer: Subject<string> = new Subject();
	searchValue: string;
	constructor() {
		this.debouncer.pipe(debounceTime(200)).subscribe(val => {
			this.onSearch.emit(val);
			this.searchValue = val;
		});
	}

	debounce(val) {
		this.debouncer.next(val);
	}
	isSeachHasValue() {
		return this.searchValue?.length > 0;
	}
	clearSearchValue() {
		this.debounce(null);
	}
}
