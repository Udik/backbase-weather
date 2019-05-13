import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutes } from '../app.router';
import { PageWeatherComponent } from '../page-weather/page-weather.component';
import { PageNotFoundComponent } from '../page-notfound/page-notfound.component';
import { PageForecastComponent } from '../page-forecast/page-forecast.component';
import { CityWeatherModel } from '../models/city-weather.model';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';

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

describe('PageForecastComponent', () => {
  let component: PageWeatherComponent;
  let fixture: ComponentFixture<PageWeatherComponent>;
  let mockResolver;
  const mockData = [
    getCityWeather('First', 'First Weather', 12.34, 23.45),
    getCityWeather('Second', 'Second Weather', 12.34, 23.45),
    getCityWeather('Third', 'Third Weather', 12.34, 23.45)
  ];

  beforeEach(async(() => {
    mockResolver = new Subject();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(AppRoutes), MatSnackBarModule],
      declarations: [PageWeatherComponent, PageForecastComponent, PageNotFoundComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          data: mockResolver
        }
      }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on selected event', () => {
    const router = TestBed.get(Router);
    spyOn(router, 'navigate');

    mockResolver.next({ citiesWeather: mockData });

    component.navigate({ index: 1, name: 'Test' });

    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['weather', 'test']);
    });
  });

  it('should display snack bar on service error', () => {
    const snackbar = TestBed.get(MatSnackBar);
    const sbRef = { onAction: () => ({ subscribe: () => null }) };
    spyOn(snackbar, 'open').and.returnValue(sbRef);
    mockResolver.next({ citiesWeather: new Error() });
    fixture.whenStable().then(() => {
      expect(snackbar.open).toHaveBeenCalled();
    });
  });
});
