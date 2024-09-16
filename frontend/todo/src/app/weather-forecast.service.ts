import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface WeatherForecast {
  date: Date,
  temperatureC: number,
  temperatureF: number,
  summary: string
}

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  private readonly backendUrl = '/WeatherForecast'

  constructor(private http: HttpClient) { }

  getWeatherForecasts(): Observable<Array<WeatherForecast>> {
    return this.http.get<Array<WeatherForecast>>(this.backendUrl);
  }
}
