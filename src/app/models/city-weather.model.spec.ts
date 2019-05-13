import { CityWeatherModel } from './city-weather.model';
import mockData from '../mocks/cityWeatherResponse.json';
import { WeatherApiResponse } from '../services/responseModels/weatherApiResponse';

describe('CityWeatherModel', () => {
    it('initializes correctly from city weather api response', () => {
        const weatherModel = CityWeatherModel.fromWeatherApiResponse(mockData as WeatherApiResponse);
        expect(weatherModel).toEqual(new CityWeatherModel({
            cityId: 2964574,
            cityName: 'Dublin',
            weatherDescription: 'broken clouds',
            weatherIcon: '04d',
            weatherId: 803,
            avgTemp: 11.26,
            windSpeed: 3.6
        }));
    });
});
