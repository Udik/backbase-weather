import { WeatherApiResponse } from '../services/responseModels/weatherApiResponse';

/*
Internal city weather model.
The constructor accepts a WeatherApi Response object to build the model instance
*/

export class CityWeatherModel {
    cityName: string;
    cityId: number;
    weatherIcon: string;
    weatherDescription: string;
    weatherId: number;
    avgTemp: number;
    windSpeed: number;

    static fromWeatherApiResponse(apiCityWeather: WeatherApiResponse): CityWeatherModel {
        const cw = new CityWeatherModel();
        cw.cityName = apiCityWeather.name;
        cw.cityId = apiCityWeather.id;
        cw.weatherDescription = apiCityWeather.weather[0].description;
        cw.weatherId = apiCityWeather.weather[0].id;
        cw.weatherIcon = apiCityWeather.weather[0].icon;
        cw.avgTemp = apiCityWeather.main.temp;
        cw.windSpeed = apiCityWeather.wind.speed;
        return cw;
    }

    constructor(init?: Partial<CityWeatherModel>) {
        Object.assign(this, init);
    }
}
