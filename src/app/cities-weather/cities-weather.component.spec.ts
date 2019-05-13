// tslint:disable:no-string-literal

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesWeatherComponent } from './cities-weather.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CityWeatherModel } from '../models/city-weather.model';

function getCityWeather(name, desc, temp, wind) {
    return new CityWeatherModel({
        cityId: 123,
        cityName: name,
        avgTemp: temp,
        weatherDescription: desc,
        weatherIcon: '',
        weatherId: 123,
        windSpeed: wind
    });
}

describe('CitiesWeatherComponent', () => {
    let component: CitiesWeatherComponent;
    let fixture: ComponentFixture<CitiesWeatherComponent>;

    const mockCityWeathers = [
        getCityWeather('First', 'First Weather', 12.34, 23.45),
        getCityWeather('Second', 'Second Weather', 12.34, 23.45),
        getCityWeather('Third', 'Third Weather', 12.34, 23.45)
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CitiesWeatherComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CitiesWeatherComponent);
        component = fixture.componentInstance;
        component.cityWeathers = mockCityWeathers;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display three cities', async () => {
        const compiled = fixture.debugElement.nativeElement;
        await new Promise(res => setTimeout(() => res(), 1000));
        expect(compiled.querySelectorAll('app-city-card').length).toEqual(3);
    });

    it('should receive a user click, set current and emit an event', async(() => {
        spyOn(component.selected, 'emit');

        const card = fixture.debugElement.nativeElement.querySelector('app-city-card:nth-child(2)');
        card.click();

        fixture.whenStable().then(() => {
            expect(component.currentTab).toEqual(1);
            expect(component.selected.emit).toHaveBeenCalledWith({
                index: 1,
                id: 123,
                name: 'Second'
            });
        });
    }));
});
