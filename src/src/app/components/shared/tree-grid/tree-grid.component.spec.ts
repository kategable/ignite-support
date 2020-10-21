import { async } from '@angular/core/testing';

import { TreeGridComponent } from './tree-grid.component';

describe('TreeGridComponent', () => {
	let component: TreeGridComponent;

	beforeEach(async(() => {}));

	beforeEach(() => {
		component = new TreeGridComponent();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show correct select all text for specified selection text', () => {
		//arrange
		component.selectionText = 'Countries';
		component.data = [
			{ id: 1, parentId: 2 , name: 'name1'},
			{ id: 1, parentId: 2 , name: 'name1'},
		];
		component.selectedItems = [
			{ id: 1, parentId: 2, name: 'name1'},
			{ id: 1, parentId: 2, name: 'name1'},
		];
		//act

		let result = component.getSelectionText();

		//asset
		expect(result).toEqual('Countries - All selected');
	});

	it('should show default select all text', () => {
		//arrange
		component.selectionText = '';
		component.data = [
			{ id: 1, parentId: 2, name: 'name1' },
			{ id: 1, parentId: 2, name: 'name1' },
		];
		component.selectedItems = [
			{ id: 1, parentId: 2, name: 'name1' },
			{ id: 1, parentId: 2, name: 'name1' },
		];
		//act
		let result = component.getSelectionText();

		//asset
		expect(result).toEqual('All selected');
	});
	it('should show show 1 selected when one in the list', () => {
		//arrange
		component.selectionText = '';
		component.data = [
			{ id: 1, parentId: 2, name: 'name1' }
		 
		];
		component.selectedItems = [
			{ id: 1, parentId: 2, name: 'name1' }
		];
		//act
		let result = component.getSelectionText();

		//asset
		expect(result).toEqual('1 selected');
	});
});
