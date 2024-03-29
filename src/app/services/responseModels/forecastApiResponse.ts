// autogenerated from JSON response with: https://jvilk.com/MakeTypes/

export interface ForecastApiResponse {
    cod: string;
    message: number;
    cnt: number;
    list?: (ListEntity)[] | null;
    city: City;
}

interface ListEntity {
    dt: number;
    main: Main;
    weather?: (WeatherEntity)[] | null;
    clouds: Clouds;
    wind: Wind;
    sys: Sys;
    dt_txt: string;
    rain: any;
}

interface Main {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

interface WeatherEntity {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Clouds {
    all: number;
}

interface Wind {
    speed: number;
    deg: number;
}

interface Sys {
    pod: string;
}

interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
}

interface Coord {
    lat: number;
    lon: number;
}
