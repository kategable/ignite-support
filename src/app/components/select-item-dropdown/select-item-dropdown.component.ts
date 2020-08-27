import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConnectedPositioningStrategy, IgxDropDownComponent, IgxInputGroupComponent, ISelectionEventArgs } from 'igniteui-angular';

@Component({
  selector: 'app-select-item-dropdown',
  templateUrl: './select-item-dropdown.component.html',
  styleUrls: ['./select-item-dropdown.component.scss']
})
export class SelectItemDropdownComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() maxHeight: string;
  @Input() displayProperty: string;
  @Input() idProperty: string;
  @Input() width: string;
  @Input() minWidth: string = '';
  @Input() list: any[];
  @Input() selectedItem: any;
  @Input() isHighlighted: boolean;
  @Input() isModal: boolean;
  @Input() placeholder: string = 'Select';
  @ViewChild(IgxDropDownComponent, { static: false }) public igxDropDown: IgxDropDownComponent;
  @Output() onSelected: EventEmitter<any> = new EventEmitter();
  @ViewChild("inputGroup", { read: IgxInputGroupComponent, static: false }) public inputGroup: IgxInputGroupComponent;

  style_id: string = 'aon-style-id';
  style_value: string = ".igx-overlay__wrapper{z-index: 2000;}";


  ngOnInit() {
    if (this.list && this.list.length === 1) {
      this.selectedItem = this.list[0];
      this.select(this.selectedItem);
    }

  }

  ngAfterViewInit(): void {
    this.igxDropDown.element.style.minWidth = this.minWidth;

  }
  openDropDown() {

    if (this.igxDropDown.collapsed) {
      this.igxDropDown.open({
        modal: false,
        positionStrategy: new ConnectedPositioningStrategy({
          target: this.inputGroup.element.nativeElement
        })
      });


    }
  }
  select(item: any) {
    this.onSelected.emit(item);
  }

  handleSelection(eventArgs: ISelectionEventArgs) {
    if (!this.selectedItem || eventArgs.newSelection.value[this.idProperty] !== this.selectedItem[this.idProperty]) {
      this.select(eventArgs.newSelection.value);
    }
  }
  getSelectedItemName() {
    if (this.selectedItem)
      return this.selectedItem[this.displayProperty];
    return null;
  }
  getDisplayPropertyValue(item: any) {
    if (item)
      return item[this.displayProperty];
    return null;
  }
  getIdPropertyValue(item: any) {
    if (item)
      return item[this.idProperty];
    return null;
  }
  handleOnOpening() {
    if (this.isModal) {
      let stylesheet = document.createElement('style');
      stylesheet.setAttribute('id', this.style_id);
      stylesheet.innerHTML = this.style_value;
      document.body.appendChild(stylesheet);
    }
    if (!this.width) {
      this.width = this.inputGroup.element.nativeElement.clientWidth + 'px';
    }
  }
  handleOnClosing() {
    if (this.isModal) {
      let element = document.getElementById(this.style_id);
      element.parentNode.removeChild(element);
    }
  }
  handleOpened() {
    if (!this.selectedItem && this.igxDropDown.focusedItem) {
      this.igxDropDown.focusedItem.focused = false;
    }

    this.igxDropDown.width = this.width;
  }


}
