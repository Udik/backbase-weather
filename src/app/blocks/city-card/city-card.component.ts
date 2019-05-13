import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CityWeatherModel } from 'src/app/models/city-weather.model';

import { faThermometerHalf, faWind } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnInit {

  @Input() cityWeather: CityWeatherModel;
  @Input() selected: boolean;
  @Output() click: EventEmitter<any> = new EventEmitter();

  faThermometer = faThermometerHalf;
  faWind = faWind;

  constructor() { }

  ngOnInit() {
  }

  clicked() {
    this.click.emit();
  }
}
