import { ForecastApiResponse } from '../services/responseModels/forecastApiResponse';

/*
Internal city forecast model.
The constructor accepts a ForecastApi Response object to build the model instance
*/
export class ForecastPeriod {
    dateTime: Date;
    weatherIcon: string;
    weatherDescription: string;
    avgTemp: number;
    windSpeed: number;

    public constructor(init?: Partial<ForecastPeriod>) {
        Object.assign(this, init);
    }
}

export class CityForecastModel {
    cityName: string;
    cityId: number;
    forecastPeriods: ForecastPeriod[];

    static fromForecastApiResponse(apiForecast: ForecastApiResponse): CityForecastModel {
        const fm = new CityForecastModel();
        fm.cityName = apiForecast.city.name;
        fm.cityId = apiForecast.city.id;
        fm.forecastPeriods = apiForecast.list.map(f => new ForecastPeriod({
            dateTime: new Date(f.dt * 1000),
            weatherDescription: f.weather[0].description,
            weatherIcon: f.weather[0].icon,
            avgTemp: f.main.temp,
            windSpeed: f.wind.speed
        }));

        return fm;
    }

    constructor(init?: Partial<CityForecastModel>) {
        Object.assign(this, init);
    }
}


