import { Component } from '@angular/core';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent {
    public items: string[] = ['Orange', 'Apple', 'Banana', 'Mango', 'Pineapple'];
}
