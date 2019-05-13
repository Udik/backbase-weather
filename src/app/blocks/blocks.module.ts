import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SpinnerComponent } from './spinner/spinner.component';
import { WeatherIconComponent } from './weathericon/weathericon.component';

import { CityCardComponent } from './city-card/city-card.component';
import { AppMaterialModule } from '../app.material.module';


@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        FontAwesomeModule
    ],
    declarations: [
        SpinnerComponent,
        WeatherIconComponent,
        CityCardComponent
    ],
    exports: [
        SpinnerComponent,
        WeatherIconComponent,
        CityCardComponent
    ]
})
export class BlocksModule { }
