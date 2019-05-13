import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { WeatherDataService } from '../services/weather-data.service';
import { CitiesService } from '../services/cities.service';
import { ServiceErrors } from '../services/service-errors';


@Injectable()
export class CitiesWeatherResolver implements Resolve<any> {
    constructor(private citiesService: CitiesService, private weatherDataService: WeatherDataService) { }

    resolve(): Observable<any> {
        return this.citiesService.getCities().pipe(mergeMap(cities => {
            return this.weatherDataService.fetchMultipleCitiesWeather(cities.map(c => c.id));
        }))
        // I want to manage service errors from the destination view,
        // which will take the appropriate action.
        // This pattern (simplified in this case) is suggested here:
        // https://github.com/angular/angular/issues/13873
        // https://stackoverflow.com/questions/43898934/how-to-handle-error-in-a-resolver
            .pipe(catchError(err => of(new Error(ServiceErrors.SERVICE_ERROR))));
    }
}

@Injectable()
export class CityWeatherResolver implements Resolve<any> {
    constructor(private citiesService: CitiesService, private weatherDataService: WeatherDataService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        return this.citiesService.getCityByName(route.params.city)
            .pipe(mergeMap(city => {
                if (!city) {
                    return of(new Error(ServiceErrors.CITY_NOT_FOUND));
                }
                return this.weatherDataService.fetchCityWeather(city.id)
                    .pipe(catchError(err => of(new Error(ServiceErrors.SERVICE_ERROR))));
            }));
    }
}


@Injectable()
export class CityForecastResolver implements Resolve<any> {
    constructor(private citiesService: CitiesService, private weatherDataService: WeatherDataService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        return this.citiesService.getCityByName(route.params.city)
            .pipe(mergeMap(city => {
                if (!city) {
                    return of(new Error(ServiceErrors.CITY_NOT_FOUND));
                }
                return this.weatherDataService.fetchCityForecast(city.id)
                    .pipe(catchError(err => of(new Error(ServiceErrors.SERVICE_ERROR))));
            }));
    }
}
