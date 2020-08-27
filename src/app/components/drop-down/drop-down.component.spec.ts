import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownComponent } from './drop-down.component';
import { IgxDropDownModule, IgxToggleModule } from 'igniteui-angular';

describe('DropDownComponent', () => {
  let component: DropDownComponent;
  let fixture: ComponentFixture<DropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropDownComponent],
      imports: [ IgxDropDownModule, NoopAnimationsModule, IgxToggleModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
