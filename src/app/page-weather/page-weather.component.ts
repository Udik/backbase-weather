import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { CityWeatherModel } from '../models/city-weather.model';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-page-weather',
    templateUrl: './page-weather.component.html',
    styleUrls: ['./page-weather.component.scss']
})
export class PageWeatherComponent implements OnInit, OnDestroy {

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

    citiesWeather: CityWeatherModel[] = null;

    ngOnInit() {

        this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data => {

            if (data.citiesWeather instanceof Error) {
                const snackbarRef =  this.snackBar.open('Error loading weather data', 'Retry', {
                    duration: 3600000,
                });

                snackbarRef.onAction().subscribe(() => {
                    this.router.navigated = false;
                    this.router.navigate(['weather']);
                });

                return;
            }

            this.citiesWeather = data.citiesWeather as CityWeatherModel[];
        });
    }

    navigate(event) {
        this.router.navigate(['weather', event.name.toLowerCase()]);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
