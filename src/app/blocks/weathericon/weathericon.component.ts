import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-weather-icon',
    template: `<img class="weatherIcon" [style.width.px]="size" [alt]="desc" [src]="'https://openweathermap.org/img/w/'+iconCode+'.png'">`,
    styles: [`
        :host {
            vertical-align: middle;
            display: inline-block;
            height: 48px;
        }
    `]
})
export class WeatherIconComponent {
    @Input() iconCode: string;
    @Input() desc: string;
    @Input() size: number = 48;
}
