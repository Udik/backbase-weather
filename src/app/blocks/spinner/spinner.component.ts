import { Component } from '@angular/core';

@Component({
    selector: 'app-spinner',
    template: `
    <div id="global-spinner">
        <div class="app-spinner" style="margin: auto; top: 50%; position: relative;">
        </div>
    </div>`,
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

}
