
export interface Tree {
	id: number;
	parentId: number;
	name: string;
}

import { SimpleChange } from '@angular/core';

export interface TypedChange<T> extends SimpleChange {
	previousValue: T;
	currentValue: T;
}

