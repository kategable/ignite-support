import { SimpleChanges } from '@angular/core';
import { TypedChange, Tree } from './tree-interface';

export interface TreeChanges extends SimpleChanges {
    data: TypedChange<Tree[]>;
    selectedItems: TypedChange<Tree[]>;
}

