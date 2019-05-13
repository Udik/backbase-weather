// tslint:disable:no-string-literal

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCardComponent } from './city-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CityWeatherModel } from 'src/app/models/city-weather.model';

describe('CityCardComponent', () => {
  let component: CityCardComponent;
  let fixture: ComponentFixture<CityCardComponent>;

  const mockCityWeather = new CityWeatherModel({
    cityId: 123,
    cityName: 'TestTown',
    avgTemp: 11.11,
    weatherDescription: 'Bad',
    weatherIcon: '',
    weatherId: 123,
    windSpeed: 123.66
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CityCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCardComponent);
    component = fixture.componentInstance;
    component.cityWeather = mockCityWeather;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays the correct information', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('TestTown');
    expect(compiled.querySelector('mat-card-content ul li:nth-child(1)').textContent).toContain('Bad');
    expect(compiled.querySelector('mat-card-content ul li:nth-child(2)').textContent).toContain('11.1 ℃');
    expect(compiled.querySelector('mat-card-content ul li:nth-child(3)').textContent).toContain('123.7 km/h');
  });

  it('should receive a user click and emit an event', async(() => {
    spyOn(component.click, 'emit');

    const card = fixture.debugElement.nativeElement.querySelector('mat-card');
    card.click();

    fixture.whenStable().then(() => {
      expect(component.click.emit).toHaveBeenCalled();
    });
  }));
});
