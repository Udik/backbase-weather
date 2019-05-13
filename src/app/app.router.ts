import { Routes } from '@angular/router';
import { PageWeatherComponent } from './page-weather/page-weather.component';
import { CitiesWeatherResolver, CityForecastResolver, CityWeatherResolver } from './resolvers/page-weather.resolver';
import { PageNotFoundComponent } from './page-notfound/page-notfound.component';
import { PageForecastComponent } from './page-forecast/page-forecast.component';

/*
The application routes
*/

export const AppRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: '/weather',
}, {
    path: 'weather',
    runGuardsAndResolvers: 'always',
    data: { animation: 'WeatherPage', isHome: true },
    resolve: {
        citiesWeather: CitiesWeatherResolver
    },
    component: PageWeatherComponent,
}, {
    path: 'weather/:city',
    runGuardsAndResolvers: 'always',
    data: { animation: 'ForecastPage' },
    resolve: {
        cityWeather: CityWeatherResolver,
        cityForecast: CityForecastResolver
    },
    component: PageForecastComponent
}, {
    path: 'error',
    data: { animation: 'ErrorPage' },
    component: PageNotFoundComponent
}, {
    path: '**',
    redirectTo: '/error',
}];
