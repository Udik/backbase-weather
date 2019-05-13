import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageForecastComponent } from './page-forecast.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutes } from '../app.router';
import { PageWeatherComponent } from '../page-weather/page-weather.component';
import { PageNotFoundComponent } from '../page-notfound/page-notfound.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceErrors } from '../services/service-errors';

describe('PageForecastComponent', () => {
  let component: PageForecastComponent;
  let fixture: ComponentFixture<PageForecastComponent>;
  let mockResolver;


  beforeEach(async(() => {
    mockResolver = new Subject();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(AppRoutes), MatSnackBarModule, NoopAnimationsModule],
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
    fixture = TestBed.createComponent(PageForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to error on unrecognized city', () => {
    const router = TestBed.get(Router);
    spyOn(router, 'navigate');

    mockResolver.next({ cityForecast: new Error(ServiceErrors.CITY_NOT_FOUND) });
    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['error'], { skipLocationChange: true });
    });
  });

  it('should display snackbar on sevice error', () => {
    const snackbar = TestBed.get(MatSnackBar);
    const sbRef = { onAction: () => ({ subscribe: () => null }) };
    spyOn(snackbar, 'open').and.returnValue(sbRef);
    mockResolver.next({ cityForecast: new Error(ServiceErrors.SERVICE_ERROR) });
    fixture.whenStable().then(() => {
      expect(snackbar.open).toHaveBeenCalled();
    });
  });

  it('should navigate to home when back is clicked', () => {
    const router = TestBed.get(Router);
    spyOn(router, 'navigate');
    mockResolver.next({ cityForecast: {} });
    component.backClicked();
    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['weather']);
    });
  });
});
