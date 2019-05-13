import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CitiesWeatherComponent } from './cities-weather/cities-weather.component';
import { CitiesForecastComponent } from './cities-forecast/cities-forecast.component';
import { WeatherDataService } from './services/weather-data.service';

import { BlocksModule } from './blocks/blocks.module';

import { AppRoutes } from './app.router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CachingInterceptor } from './services/http-caching-interceptor';
import { RequestCache } from './services/request-cache.service';
import { RouterModule } from '@angular/router';
import { PageWeatherComponent } from './page-weather/page-weather.component';
import { CitiesWeatherResolver, CityForecastResolver, CityWeatherResolver } from './resolvers/page-weather.resolver';
import { PageNotFoundComponent } from './page-notfound/page-notfound.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material.module';
import { PageForecastComponent } from './page-forecast/page-forecast.component';
import { CitiesService } from './services/cities.service';


@NgModule({
    declarations: [
        AppComponent,
        CitiesWeatherComponent,
        CitiesForecastComponent,
        PageWeatherComponent,
        PageForecastComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        BlocksModule,
        AppMaterialModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [
        RequestCache,
        HttpClient,
        { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
        CitiesService,
        WeatherDataService,
        CitiesWeatherResolver,
        CityWeatherResolver,
        CityForecastResolver
    ],
    exports: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
