import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from './select.component';
import { IgxSelectModule } from 'igniteui-angular';

describe('SelectComponent', () => {
    let component: SelectComponent;
    let fixture: ComponentFixture<SelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectComponent],
            imports: [IgxSelectModule, NoopAnimationsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
         expect(component).toBeTruthy();
    });
});
