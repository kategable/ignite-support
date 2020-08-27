import { Component, Input, ChangeDetectionStrategy, ViewChild, AfterViewInit, EventEmitter, Output, OnChanges } from '@angular/core';

import {
    IgxComboComponent,
} from 'igniteui-angular';

@Component({
    selector: 'app-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MultiSelectComponent implements AfterViewInit, OnChanges {

    @Input() name: string;
    @Input() allText: string = "All";
    @Input() items: any[];
    @Input() selectedItems: any[];
    @Input() page: string = null;
    @Output() selectedItemsChange = new EventEmitter();
    @Output() handleClosedEvent = new EventEmitter();
    @Input() width: string;
    @Input() isDisabled: boolean = false;
    @Input() displaySelectedText: string | undefined;
    @Input() helpTextClass: string | undefined;
    @ViewChild(IgxComboComponent, { static: true }) public igxCombo: IgxComboComponent;

    isAllChecked: boolean = false;
    isIndeterminate: boolean = false;
    isInitialized: boolean = false;
    selectionEvent: any = null;

    constructor() {
    }

    ngAfterViewInit() {
        this.igxCombo.comboInput.nativeElement.classList.add('help-text');
        this.setHelperText(this.selectedItems);
        this.isInitialized = true;
    }

    ngOnChanges() {
        if (this.isInitialized) {
            if (this.selectedItems.length === 0) {
                this.igxCombo.deselectAllItems();
            }
            this.setHelperText(this.selectedItems);
        }
    }

    selectAll(el: any) {
        if (el.checked) {
            this.igxCombo.selectAllItems();
        }
        else {
            this.igxCombo.deselectAllItems();
        }
    }

    handleOpening() {
        for (let item of this.selectedItems) {
            let selectedItem = this.items.find(x => x.id === item.id);
            this.igxCombo.setSelectedItem(selectedItem, true);
        }
    }

    handleSelection(event: any) {
        if (this.isInitialized) {
            this.setHelperText(event);
            this.selectedItemsChange.emit(event);
        }
    }

    handleClosed() {
        if (this.isInitialized) {
            this.handleClosedEvent.emit();
        }
    }

    setHelperText(items: any[]) {
        let info = this.name;
        this.isIndeterminate = false;
        let helpTextClass = this.helpTextClass === undefined ? 'red-help-text' : this.helpTextClass;
        if (items.length === this.items.length && this.items.length !== 0 && this.items.length === this.selectedItems.length) {
            this.isAllChecked = true;
            info = info + " - All selected";
            this.igxCombo.comboInput.nativeElement.classList.add(helpTextClass);
        } else if (items.length > 0) {
            this.isAllChecked = false;
            info = info + " - " + items.length + " selected";
            this.igxCombo.comboInput.nativeElement.classList.add(helpTextClass);
            this.isIndeterminate = true;
        } else {
            this.isAllChecked = false;
            this.igxCombo.comboInput.nativeElement.classList.remove(helpTextClass);
        }
        info = this.displaySelectedText === undefined ? info : this.displaySelectedText;
        (this.igxCombo as any)._value = info;
    }
}
