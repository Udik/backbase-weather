import mockData from '../mocks/cityForecastResponse.json';
import { CityForecastModel, ForecastPeriod } from './city-forecast.model';
import { ForecastApiResponse } from '../services/responseModels/forecastApiResponse.js';

describe('CityForecastModel', () => {
    it('initializes correctly from city weather api response', () => {
        const forecastModel = CityForecastModel.fromForecastApiResponse(mockData as ForecastApiResponse);
        expect(forecastModel).toEqual(new CityForecastModel({
            cityId: 2964574,
            cityName: 'Dublin',
            forecastPeriods: [new ForecastPeriod({
                dateTime: new Date(1557619200000),
                weatherDescription: 'scattered clouds',
                weatherIcon: '03n',
                avgTemp: 5.29,
                windSpeed: 2.32
            })]
        }));
    });
});
