import { SimpleChanges } from '@angular/core'; 
import { SurveyFilter } from '.';
import { TypedChange } from './tree-interface';

export interface MarketFiltersChanges extends SimpleChanges {
    filterData: TypedChange<SurveyFilter[]>;
    selectedFilters: TypedChange<SurveyFilter[]>;
}

