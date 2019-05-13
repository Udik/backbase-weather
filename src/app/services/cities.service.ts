import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from '../models/city.interface';

const CitiesConfig = [{
    name: 'Amsterdam',
    id: 2759794
}, {
    name: 'Dublin',
    id: 2964574,
}, {
    name: 'London',
    id: 2643743,
}, {
    name: 'Paris',
    id: 2968815
}, {
    name: 'Berlin',
    id: 2950159
}];

@Injectable()
export class CitiesService {

    getCities(): Observable<City[]> {
        return of(CitiesConfig);
    }

    getCityByName(cityname: string): Observable<City> {
        return this.getCities().pipe(map(cities => {
            const city = cities.find(c => c.name.toLowerCase() === cityname.toLowerCase());
            return city;
        }));
    }
}
