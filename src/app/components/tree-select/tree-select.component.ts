import { Component, ViewChild, AfterViewInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from "@angular/core";
import {
    VerticalAlignment,
    HorizontalAlignment,
    IgxToggleDirective,
    IgxInputGroupComponent,
    IgxInputDirective,
    IgxTreeGridComponent,
    AbsoluteScrollStrategy
    , ConnectedPositioningStrategy
    , IgxCheckboxComponent,
    IRowToggleEventArgs
    ,
} from "@infragistics/igniteui-angular";

@Component({
    selector: "app-tree-select",
    styleUrls: ["./tree-select.component.scss"],
    templateUrl: "./tree-select.component.html"
})
export class TreeSelectComponent implements AfterViewInit, OnChanges {
    @ViewChild(IgxInputDirective, { read: IgxInputDirective, static: false })
    public input: IgxInputDirective;
    @ViewChild(IgxToggleDirective, { read: IgxToggleDirective, static: false })
    public igxToggle: IgxToggleDirective;
    @ViewChild(IgxTreeGridComponent, { read: IgxTreeGridComponent, static: false })
    public comboTreeGrid: IgxTreeGridComponent;
    @ViewChild(IgxInputGroupComponent, { read: IgxInputGroupComponent, static: false })
    public inputGroup: IgxInputGroupComponent;

    @ViewChild('allCheck', { read: IgxCheckboxComponent, static: false })
    public allCheckBox: IgxCheckboxComponent;


    @Input() dataSource: any[] = [];
    @Input() selectedItems: any[];
    @Input() childDataKey: any;
    @Input() searchPlaceholderText: string;
    @Input() primaryKeyField: string;
    @Input() contentWidth: string;
    @Input() countParent: boolean = false;
    @Input() disabled: boolean = false;
    @Output() selectedItemsChange = new EventEmitter<any>();
    expandEnabled: boolean = true;

    isOpen: boolean;
    searchValue: string;
    totalCount: number;
    isAllChecked: boolean = false;
    isAnyChecked: boolean = false;
    isExpanded: boolean = true;
    isAnyExpanded: boolean = true;
    expansionStates: any;
    public selectionMode = 'multiple';
    public ngAfterViewInit() {
        // check the selcted items passed
        if (this.selectedItems?.length > 0) {
            let rowIds = this.selectedItems.map(x => x[this.primaryKeyField]);
            this.comboTreeGrid.selectRows(rowIds, false);
        }
        this.totalCount = this.setAncestorsForDatasourceItemAndGetCount(this.dataSource, []);
        // this.expandEnabled = this.dataSource.some((item)=> item.children.length > 1);
        this.isAnyChecked = this.selectedItems && this.selectedItems.length > 0;
        if (this.selectedItems?.length > 0 && this.selectedItems.length === this.totalCount) {
            this.isAllChecked = true;
        }
    }
    isExpandEnabled(): boolean {
        return false;// this.dataSource.some((item)=> item.children.length > 1);     
    }

    setAncestorsForDatasourceItemAndGetCount(source: any[], parentIds: any[]): number {
        let totalItemCount = 0;
        for (var item of source) {
            item["parents"] = parentIds;
            totalItemCount += 1;
            if (item[this.childDataKey] && item[this.childDataKey].length > 0) {
                totalItemCount += this.setAncestorsForDatasourceItemAndGetCount(item[this.childDataKey], [...parentIds, item])
            }
        }
        return totalItemCount;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (typeof changes['selectedItems']) {
            let changedSelectedItems = changes['selectedItems'];
            if (!changedSelectedItems.firstChange) {
                if (changedSelectedItems) {
                    for (let item of this.dataSource) {

                        let itemChildren = this.getChildren(item);
                        let itemTreeRowIds = [];
                        if (itemChildren) {
                            itemTreeRowIds = itemChildren.map(x => x[this.primaryKeyField]);
                        }

                        itemTreeRowIds.push(item[this.primaryKeyField]);
                        this.comboTreeGrid.deselectRows(itemTreeRowIds);
                        this.isAllChecked = false;
                    }
                }
            }
        }
    }
    public onRowClickChange(event: any) {
        // cancel the event
        if (event.cell && event.cell.cellID && event.cell.cellID.rowID) {           
            this.onSelectorClick(null, {"rowID":event.cell.cellID.rowID });
        }
        event.cancel = true;
    }


    OnHeaderClick(event: any) {
        if (!this.isAllChecked) {
            this.comboTreeGrid.selectAllRows();
            this.isAllChecked = true;
           // return;
        }
        this.comboTreeGrid.deselectAllRows();
        this.isAllChecked = false;      
        let selectedRows: any[] = [];
        let selectedRowIds = [];
        let unSelectedRows = [];
        let unSelectedRowIds = [];
        var fnAddAllRowsToBuckets = (selectedItem: any) => {
            if (this.isAnyChecked) {
                unSelectedRows.push(selectedItem);
                unSelectedRowIds.push(selectedItem[this.primaryKeyField])
            } else {
                if (!this.selectedItems.some(x => x[this.primaryKeyField] === selectedItem[this.primaryKeyField])) {
                    selectedRows.push(selectedItem);
                    selectedRowIds.push(selectedItem[this.primaryKeyField])
                }
            }

            if (selectedItem[this.childDataKey] && selectedItem[this.childDataKey].length > 0) {
                for (let item of selectedItem[this.childDataKey]) {
                    fnAddAllRowsToBuckets(item);
                }
            }
        }
        for (let item of this.dataSource) {
            fnAddAllRowsToBuckets(item);
        }
        if (selectedRowIds.length > 0) {
            this.comboTreeGrid.selectRows(selectedRowIds, false);
            this.checkAndAddSelectedItems(selectedRows);
        }
        else {
            this.comboTreeGrid.deselectRows(unSelectedRowIds);
            this.checkAndRemoveUnselectedItems(unSelectedRows);
        }
        this.selectedItemsChange.emit(this.selectedItems)
        if (this.selectedItems && this.selectedItems.length > 0 && this.selectedItems.length === this.totalCount) {
            this.isAllChecked = true;
        }
        else {
            this.isAllChecked = false;
        }
        this.isAnyChecked = this.selectedItems?.length > 0;
    }
    onSelectorClick(event: any, context: any) {
console.log("onsel");

        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        let isSelected: boolean = context.selected;
        isSelected = this.getRowSelectionStatus(context, isSelected);

        let selectedRowId = context.rowID;
        let selectedItem = this.getSelectedItemFromDataSource(selectedRowId);
        //find SelectedItem 

        if (selectedItem) {
            this.OnItemSelected(selectedItem, isSelected);
        }
        this.selectedItemsChange.emit(this.selectedItems)
        this.isAnyChecked = this.selectedItems?.length > 0;


    }
    private OnItemSelected(selectedItem: any, isSelected: boolean) {
        // let subscriberEventParam = [];
        let selectedItemsFromDatasource: any[] = [];
        let newSelectedItems = this.getChildren(selectedItem);



        if (selectedItem[this.childDataKey]) {
            selectedItemsFromDatasource = selectedItemsFromDatasource.concat(newSelectedItems);
        }
        selectedItemsFromDatasource.push(selectedItem);


        this.UpdateCheckBoxes(isSelected, selectedItemsFromDatasource);

    }




    private UpdateCheckBoxes(isSelected: boolean, selectedItemsFromDatasource: any[]) {
        if (isSelected) {
            this.selectRows(selectedItemsFromDatasource);
            if (this.selectedItems && this.selectedItems.length > 0 && this.selectedItems.length === this.totalCount) {
                this.isAllChecked = true;
            }
        }
        else {
            this.unselectRows(selectedItemsFromDatasource);
            this.isAllChecked = false;
        }
    }

    private getItemFromHierarchy(rootItem: any, targetItemId: any): any {
        if (rootItem && rootItem[this.primaryKeyField] === targetItemId) {
            return rootItem;
        }
        else if (rootItem[this.childDataKey]) {
            for (let childItemIndex in rootItem[this.childDataKey]) {
                let foundItem = this.getItemFromHierarchy(rootItem[this.childDataKey][childItemIndex], targetItemId);
                if (foundItem) {
                    return foundItem;
                }
            }
        }
    }
    private getChildren(selectedItem: any): any[] {
        let rowIds = [];
        for (let child in selectedItem[this.childDataKey]) {
            rowIds.push(selectedItem[this.childDataKey][child])
            if (selectedItem[this.childDataKey][child][this.childDataKey]) {
                rowIds = rowIds.concat(this.getChildren(selectedItem[this.childDataKey][child]))
            }
        }
        return rowIds;
    }

    private getSelectedItemFromDataSource(selectedRowId: any): any {
        let selectedItem: any;
        for (let itemIndex in this.dataSource) {
            selectedItem = this.getItemFromHierarchy(this.dataSource[itemIndex], selectedRowId);
            if (selectedItem) break;
        }
        return selectedItem;
    }



    private unselectRows(rows: any[]) {
        let rowIds = [];
        for (let rowIndex in rows) {
            if (this.selectedItems.some(x => x[this.primaryKeyField] === rows[rowIndex][this.primaryKeyField])) {
                rowIds.push(rows[rowIndex][this.primaryKeyField]);
                if (rows[rowIndex]["parents"] && rows[rowIndex]["parents"]) {
                    let parentIds = rows[rowIndex]["parents"].map(x => x[this.primaryKeyField]);
                    rowIds.push(...parentIds);
                    rows.push(...rows[rowIndex]["parents"]);
                }
            }
        }
        this.comboTreeGrid.deselectRows(rowIds);
        this.checkAndRemoveUnselectedItems(rows);
    }

    private selectRows(rows: any[]) {
        let rowIds = [];
        for (let rowIndex in rows) {
            if (!this.selectedItems.some(x => x[this.primaryKeyField] === rows[rowIndex][this.primaryKeyField])) {
                rowIds.push(rows[rowIndex][this.primaryKeyField]);
            }
        }
        this.comboTreeGrid.selectRows(rowIds, false);

        this.checkAndAddSelectedItems(rows);
    }

    private getRowSelectionStatus(context: any, isSelected: boolean) {
        if (this.selectedItems.findIndex(x => x[this.primaryKeyField] === context.rowID) === -1) {
            isSelected = true;
        }
        else {
            isSelected = false;
        }
        return isSelected;
    }




    private checkAndRemoveUnselectedItems(rowIds: any[]) {
        for (let rowIdIndex in rowIds) {
            let index = this.selectedItems.findIndex(x => x[this.primaryKeyField] === rowIds[rowIdIndex][this.primaryKeyField]);
            if (index > -1) {
                this.selectedItems.splice(index, 1);
            }
        }
    }

    private checkAndAddSelectedItems(rowIds: any[]) {
        for (let rowIdIndex in rowIds) {
            let index = this.selectedItems.findIndex(x => x[this.primaryKeyField] === rowIds[rowIdIndex][this.primaryKeyField]);
            if (index === -1) {
                this.selectedItems.push(rowIds[rowIdIndex]);
            }
        }
    }




    private _positionSettings = {
        horizontalStartPoint: HorizontalAlignment.Left,
        verticalStartPoint: VerticalAlignment.Bottom
    };

    private overlaySettings = {
        closeOnOutsideClick: true,
        modal: false,
        positionStrategy: new ConnectedPositioningStrategy(this._positionSettings),
        scrollStrategy: new AbsoluteScrollStrategy()
    };

    open() {
        if (!this.igxToggle.collapsed) {
            return;
        }
        this.overlaySettings.positionStrategy.settings.target = this.inputGroup.element.nativeElement;
        this.igxToggle.open(this.overlaySettings);
        console.log("open");
        
        if (!this.contentWidth) {
            this.contentWidth = this.inputGroup.element.nativeElement.clientWidth + 'px';
        }
        this.comboTreeGrid.width = this.contentWidth;

        requestAnimationFrame(() => {
            this.comboTreeGrid.rowList.first.cells.first.element.nativeElement.focus();
        });
    }
    toggle() {
        if (this.igxToggle.collapsed) {
            this.open();
            return;
        }
        this.igxToggle.close();
    }

    onToggleClosing() {
        this.comboTreeGrid.navigateTo(0, 0);

    }
    getSelectionText() {
        if (this.isAllChecked) {
            return `${this.searchPlaceholderText} - All selected`;
        }
        if (this.selectedItems?.length > 0) {
            let selectedNonGroups = this.selectedItems.filter(s=>!s[this.childDataKey]);
            return `${this.searchPlaceholderText} - ${selectedNonGroups.length.toString()} selected`;
        }
        return this.searchPlaceholderText;
    }

    onExpandCollapseClick() {
        this.isAnyExpanded ? this.comboTreeGrid.collapseAll() : this.comboTreeGrid.expandAll();
        this.isAnyExpanded = !this.isAnyExpanded;
    }

    rowToggle(event: IRowToggleEventArgs) {
        let isAnyExpanded = false;
        if (event.expanded) {
            this.isAnyExpanded = true;
            return;
        }
        this.comboTreeGrid.records.forEach((value, key) => {
            if (key == event.rowID) return;
            if (value.expanded) {
                isAnyExpanded = true;
                return;
            }
        })
        this.isAnyExpanded = isAnyExpanded;
    }
    isGroup(name: string): boolean {
        return this.dataSource.find(d => d.name == name);
    }

    isSomeInGroupChecked(rowContext): boolean{
        if(this.isGroup(rowContext.rowID)){
            console.log( this.selectedItems); 
            return true;
        }
       return false;
    }
}
