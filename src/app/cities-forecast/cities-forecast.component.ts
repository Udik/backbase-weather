import { Component, Input } from '@angular/core';
import { CityForecastModel } from '../models/city-forecast.model';

@Component({
    selector: 'app-cities-forecast',
    templateUrl: './cities-forecast.component.html',
    styleUrls: ['./cities-forecast.component.scss']
})
export class CitiesForecastComponent {

    constructor() { }

    @Input() cityForecast: CityForecastModel;
}
