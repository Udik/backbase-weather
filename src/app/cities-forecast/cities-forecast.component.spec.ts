// tslint:disable:no-string-literal

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesForecastComponent } from './cities-forecast.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CityForecastModel } from '../models/city-forecast.model';

describe('CitiesForecastComponent', () => {
    let component: CitiesForecastComponent;
    let fixture: ComponentFixture<CitiesForecastComponent>;

    const mockCityForecast = new CityForecastModel({
        cityId: 123,
        cityName: 'TestTown',
        forecastPeriods: [{
            dateTime: new Date('2019-01-01 12:00:00'),
            weatherIcon: '',
            weatherDescription: 'First',
            avgTemp: 12.34,
            windSpeed: 23.46
        }, {
            dateTime: new Date('2019-01-01 16:00:00'),
            weatherIcon: '',
            weatherDescription: 'Second',
            avgTemp: 12.34,
            windSpeed: 23.46
        }, {
            dateTime: new Date('2019-01-02 12:00:00'),
            weatherIcon: '',
            weatherDescription: 'Third',
            avgTemp: 12.34,
            windSpeed: 23.46
        }]
      });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CitiesForecastComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CitiesForecastComponent);
        component = fixture.componentInstance;
        component.cityForecast = mockCityForecast;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display three forecast periods', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('.forecastPeriod').length).toEqual(3);
    });

    it('should display two dates', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('.date').length).toEqual(2);
    });

    it('should display correct info in forecast row', () => {
        const compiled = fixture.debugElement.nativeElement;
        const tc = compiled.querySelector('.forecastPeriod:nth-child(3)').textContent;

        expect(tc).toContain('4:00 PM');
        expect(tc).toContain('Second');
        expect(tc).toContain('12.3 ℃');
        expect(tc).toContain('23.5 km/h');
    });

    it('should display correct info in date row', () => {
        const compiled = fixture.debugElement.nativeElement;
        const tc = compiled.querySelector('.date:nth-child(4)').textContent;

        expect(tc).toContain('Jan 2, 2019');
    });
});
