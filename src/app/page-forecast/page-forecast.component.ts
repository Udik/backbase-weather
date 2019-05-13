import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { CityWeatherModel } from '../models/city-weather.model';
import { CityForecastModel } from '../models/city-forecast.model';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ServiceErrors } from '../services/service-errors';

/*
The page collects data from resolvers, orchestrates components, triggers navigation events
*/

@Component({
    selector: 'app-page-forecast',
    templateUrl: './page-forecast.component.html',
    styleUrls: ['./page-forecast.component.scss']
})
export class PageForecastComponent implements OnInit, OnDestroy {

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

    // we store the data returned from the resolver,
    // then in the template we pass it to our data components
    cityWeather: CityWeatherModel = null;
    cityForecast: CityForecastModel = null;

    ngOnInit() {

        this.route.data
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {

            if (data.cityForecast instanceof Error) {
                const err = data.cityForecast as Error;

                if (err.message === ServiceErrors.CITY_NOT_FOUND) {
                    // navigate to error page, skipping location change
                    this.router.navigate(['error'], { skipLocationChange: true });
                } else {
                    const snackbarRef =  this.snackBar.open('Error loading weather data', 'Retry', {
                        duration: 3600000,
                    });

                    snackbarRef.onAction().subscribe(() => {
                        this.router.navigated = false;
                        this.router.navigateByUrl(this.router.url);
                    });
                }
                return;
            }

            this.cityWeather = data.cityWeather as CityWeatherModel;
            this.cityForecast = data.cityForecast;
        });
    }

    backClicked() {
        this.router.navigate(['weather']);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
