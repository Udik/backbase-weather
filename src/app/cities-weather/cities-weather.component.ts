import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CityWeatherModel } from '../models/city-weather.model';

/*
Displays the weather of the five cities, using the data passed by the parent component.
Emits an event when a city has been selected.
The parent component can set the initial selected city.
*/

@Component({
    selector: 'app-cities-weather',
    templateUrl: './cities-weather.component.html',
    styleUrls: ['./cities-weather.component.scss']
})
export class CitiesWeatherComponent implements OnInit {

    constructor() { }

    @Input() cityWeathers: CityWeatherModel[] = null;
    @Output() selected = new EventEmitter();
    @Input() currentCityId: number = 0;

    currentTab: number;
    currentCity: CityWeatherModel;

    ngOnInit() {
        if (this.currentCityId !== 0) {
            this.currentTab = this.cityWeathers.findIndex(cw => cw.cityId === this.currentCityId);
        }
    }

    switchTab(num) {
        this.currentCity = this.cityWeathers[num];
        this.currentTab = num;
        this.selected.emit({ index: num,
                id: this.currentCity.cityId,
                name: this.currentCity.cityName });
    }
}
