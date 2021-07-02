import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import {
	AbsoluteScrollStrategy,
	ConnectedPositioningStrategy,
	HorizontalAlignment,
	IgxGridRowComponent,
	IgxInputGroupComponent,
	IgxToggleDirective,
	IgxTreeGridComponent,
	VerticalAlignment,
} from '@infragistics/igniteui-angular';
import { TreeChanges } from 'src/src/app/common/types/tree-changes.interface';
import { Tree } from 'src/src/app/common/types/tree-interface';
 export const ADDED_ACTION = 'added';
export const REMOVED_ACTION = 'removed';

@Component({
	selector: 'app-tree-select',
	templateUrl: './tree-select.component.html',
	styleUrls: ['./tree-select.component.scss'],
})
export class TreeSelectComponent implements OnChanges {
	@Input() data: Tree[] = [];
	@Input() selectedItems: Tree[] = [];
	@Input() childDataKey: string;
	@Input() searchPlaceholderText: string = "Select";
	@Input() selectionText: string;
	@Input() primaryKeyField: string;
	@Input() contentWidth: string;
	@Input() disabled: boolean = false;
	@Input() isFlat: boolean = false;
	@Input() excludeParentsFromTotal: boolean = false;
	@Input() selectOneAcception: boolean = true;
	@Input() highlightAcception: boolean = false;
	@Output() selectedItemsChange = new EventEmitter<any>();

	@ViewChild(IgxTreeGridComponent, {
		read: IgxTreeGridComponent,
		static: false,
	})
	public comboTreeGrid: IgxTreeGridComponent;
	@ViewChild(IgxInputGroupComponent, {
		read: IgxInputGroupComponent,
		static: false,
	})
	public inputGroup: IgxInputGroupComponent;

	@ViewChild(IgxToggleDirective, { read: IgxToggleDirective, static: false })
	public igxToggle: IgxToggleDirective;

		
	private _positionSettings = {
		horizontalStartPoint: HorizontalAlignment.Left,
		verticalStartPoint: VerticalAlignment.Bottom,
	};
	private overlaySettings = {
		closeOnOutsideClick: true,
		modal: false,
		positionStrategy: new ConnectedPositioningStrategy(
			this._positionSettings
		),
		scrollStrategy: new AbsoluteScrollStrategy(),
	};
	dataHasManyLevels: boolean = false;

	constructor() {}

	handleSelectOneAcception() {
		let element = document.getElementsByClassName('igx-grid__thead')[0];
		if (!element) return;
		element['hidden'] = false;
		if (this.selectOneAcception && this.data.length === 1) {
			element['hidden'] = true;
			let event = {
				added: this.data.map(i => i.id),
				removed: [],
			};
			this.handleSelection(event);
		}
	}
	handleSelection(event) {
		event.cancel = true;
		console.log("handleSelection",event);
		
		//main logic for the recursive data to select and unselect
		if (this.canSelectionGetUpdated(event, ADDED_ACTION)) {
			let parents = this.getParentsToUpdate(event.added, ADDED_ACTION);
			if (parents?.length > 0) {
				parents.map(i => event.added.push(i.id));
			}
			setTimeout(() => {
				this.comboTreeGrid.selectRows(event.added, false);
				this.emitSelectedValues();
			}, 1);
		}
		if (this.canSelectionGetUpdated(event, REMOVED_ACTION)) {
			let parents = this.getParentsToUpdate(
				event.removed,
				REMOVED_ACTION
			);
			if (parents?.length > 0) {
				parents.map(i => event.removed.push(i.id));
			}
			setTimeout(() => {
				this.comboTreeGrid.deselectRows(event.removed);
				this.emitSelectedValues();
			}, 1);
		}
	}

	handleToggleClosing() {
		this.comboTreeGrid.navigateTo(0, 0);
	}
	open() {
       
		if (!this.igxToggle.collapsed) {
			return;
		}
		this.overlaySettings.positionStrategy.settings.target = this.inputGroup.element.nativeElement;
		this.igxToggle.open(this.overlaySettings);

		if (!this.contentWidth) {
			this.contentWidth =
				this.inputGroup.element.nativeElement.clientWidth + 'px';
		}
		this.comboTreeGrid.width = this.contentWidth;

		requestAnimationFrame(() => {
			this.comboTreeGrid.rowList.first?.cells.first.element.nativeElement.focus();
		});
	}
	toggle() {
		if (this.igxToggle.collapsed) {
			this.open();
			return;
		}
		this.igxToggle.close();
	}	 

	handleSelectAllClick(event) {
		//select all text only selects items
		if (this.data?.length !== this.selectedItems?.length) {
			this.comboTreeGrid.selectAllRows();
			this.selectedItems = this.data;
			this.emitSelectedValues();
		}
	}

	handleCellClick(eventObject) {
		console.log("eventObject",eventObject);
		
		//when user clicks on the cell
		//cancel the default control behavior to (un)select all selections with `cancelBubble = true`
		//call the main method with object to either add or remove item clicked on
		eventObject.event.cancelBubble = true;
		eventObject.removed = [];
		eventObject.added = [];
		let selected = this.selectedItems.find(
			i => i.id === eventObject.cell.cellID.rowID
		);
		if (selected) {
			eventObject.removed.push(eventObject.cell.cellID.rowID);
		} else {
			eventObject.added.push(eventObject.cell.cellID.rowID);
		}
		this.handleSelection(eventObject);
	}
	allSelectedFor(rowContext) {
		return false;
	}
	ngOnChanges(changes: TreeChanges) {
 
		if (changes.selectedItems && !changes.selectedItems.isFirstChange()) {
			if(this.selectedItems?.length === 0 ){
				this.comboTreeGrid?.deselectAllRows();	

			}	
		}
		if (changes.selectedItems && changes.selectedItems.isFirstChange()) {
			if(this.selectedItems?.length === 0 ){
				this.comboTreeGrid?.deselectAllRows();	

			}
			if (this.selectedItems?.length > 0) {
				this.comboTreeGrid?.selectRows(
					this.selectedItems.map(i => i.id)
				);
			}		
		}
		if (changes.data && changes.data.currentValue) {
			this.comboTreeGrid?.deselectAllRows();
			if (this.data.length > 0) {
				this.handleSelectOneAcception();
			}
		}
	}
	ngAfterViewInit(){
       
		if (this.selectedItems?.length > 0) {
			this.comboTreeGrid?.selectRows(
				this.selectedItems.map(i => i.id)
			);
		}
	}
	private getAllNodeIds(itemToCheckID: number): number[] {
		let list = [itemToCheckID];

		let children = this.data.filter(
			dataItem => dataItem.parentId === itemToCheckID
		);

		if (this.dataHasManyLevels) {
			let grandChildren = children.map(child =>
				this.getAllNodeIds(child.id)
			);
			const flattenedArray = [].concat(grandChildren);
			if (flattenedArray.length > 0) {
				list = list.concat(flattenedArray);
			}
		} else {
			list = list.concat(children.map(i => i.id));
		}
		return list;
	}
	private getItemsFromData(list: number[]): Tree[] {
		if (list.length === 0) return [];

		let reduced = this.data.reduce((acc, item) => {
			if (list.includes(item.id)) {
				acc.push(item);
			}
			return acc;
		}, []);

		return reduced;
	}

	private getParentsToUpdate(itemIds, itemsAction): Tree[] {
		let itemChangingId = itemIds[0];
		let item = this.data.find(i => i.id === itemChangingId);
		let parent = this.data.find(i => i.id === item.parentId);
		let list = [];
		if (!parent) {
			// top level node
			return null;
		}

		let returnParent = false;
		let allSelections = itemIds.concat(this.selectedItems.map(i => i.id)); // selected items may not have all items being selected yet
		let allRelatedNodes = this.getAllNodeIds(parent.id);
		if (itemsAction === ADDED_ACTION) {
			// check if all children are selected
			returnParent = this.allSiblingsSelected(
				allRelatedNodes,
				parent,
				allSelections
			);
		}
		if (itemsAction === REMOVED_ACTION) {
			// when unselecting return true to unselect a parent
			returnParent = true;
			list = [parent];
		}
		if (this.dataHasManyLevels && returnParent) {
			// if theree is a parent lets check for grandparents
			list = [parent];
			let grandParents = this.getParentsToUpdate(
				[parent.id, itemIds],
				itemsAction
			);
			if (grandParents?.length > 0) {
				grandParents.map(i => list.push(i));
			}
		}
		if (!this.dataHasManyLevels && returnParent) {
			list = [parent];
		}

		return returnParent ? list : null;
	}
	private allSiblingsSelected(
		allRelatedNodes: number[],
		parent: Tree,
		allSelections: number[]
	): boolean {
		const siblings = allRelatedNodes.filter(i => i !== parent.id);
		const allSelected = siblings.every(node =>
			allSelections.find(selectedId => selectedId === node)
		);
		return allSelected;
	}

	private canSelectionGetUpdated(event, itemsAction): boolean {
		if (event[itemsAction].length === 0) {
			return false;
		}
		if (event[itemsAction].length === 1) {
			let allRelatedNodes = this.getAllNodeIds(event[itemsAction][0]);

			if (allRelatedNodes.length > 1) {
				event[itemsAction] = allRelatedNodes;
				this.handleSelection(event);
				return false;
			}
		}
		return true;
	}

	private emitSelectedValues() {
		let selected = this.comboTreeGrid.selectedRows();
		this.selectedItems = this.getItemsFromData(selected);
		this.selectedItemsChange.emit(this.selectedItems);
	}

	getSelectionText(): string {
		let selectedItems = this.selectedItems || [];
		let data = this.data;

		if (this.excludeParentsFromTotal) {
			selectedItems = selectedItems.filter(i => i.parentId !== -1);
			data = this.data.filter(i => i.parentId !== -1);
		}
		let title = '';
		if (this.selectionText?.length > 0) {
			title = `${this.selectionText} - `;
		}

		if (data?.length === 1 && selectedItems?.length === 1) {
			return `${title}1 selected`;
		}

		if (data?.length > 0 && data?.length === selectedItems?.length) {
			return `${title}All selected`;
		}

		if (selectedItems?.length > 0) {
			return `${title}${selectedItems.length.toString()} selected`;
		}
		return this.searchPlaceholderText;
	}
}
