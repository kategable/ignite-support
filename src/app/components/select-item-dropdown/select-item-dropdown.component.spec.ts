import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectItemDropdownComponent } from './select-item-dropdown.component';

describe('SelectItemDropdownComponent', () => {
  let component: SelectItemDropdownComponent;
  let fixture: ComponentFixture<SelectItemDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectItemDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectItemDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
