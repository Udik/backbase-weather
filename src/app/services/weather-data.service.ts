import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { WeatherApiResponse } from './responseModels/weatherApiResponse';
import { ForecastApiResponse } from './responseModels/forecastApiResponse';
import { CityWeatherModel } from '../models/city-weather.model';
import { CityForecastModel } from '../models/city-forecast.model';


/*
The weather data service.
I'm not managing service errors here, rather I let them flow towards the consumers
*/

@Injectable()
export class WeatherDataService {

    apibase = environment.weatherApiBase;

    appid = 'APPID=53eb4fe11280b99ad1685e78321aaccc';

    constructor(private http: HttpClient) {
    }

    // single city weather endpoint
    fetchCityWeather(cityId: number) {
        return this.http.get<WeatherApiResponse>(`${this.apibase}/weather?id=${cityId}&units=metric&${this.appid}`)
        .pipe(map(res => CityWeatherModel.fromWeatherApiResponse(res)));
    }

    // uses the single-city endpoint to retrieve our 5 cities in parallel
    fetchMultipleCitiesWeather(cityIds: number[]): Observable<CityWeatherModel[]> {
        const obs = cityIds.map(cid => this.fetchCityWeather(cid));
        return forkJoin(obs);
    }

    // city forecast endpoint
    fetchCityForecast(cityId: number): Observable<CityForecastModel> {
        return this.http.get<ForecastApiResponse>(`${this.apibase}/forecast?id=${cityId}&units=metric&${this.appid}`)
        .pipe(map(res => CityForecastModel.fromForecastApiResponse(res)));
    }
}
