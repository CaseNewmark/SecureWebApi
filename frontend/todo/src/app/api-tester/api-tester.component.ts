import { Component, OnInit } from '@angular/core';
import { Client, WeatherForecast } from '../client';

@Component({
  selector: 'app-api-tester',
  standalone: true,
  imports: [],
  templateUrl: './api-tester.component.html',
  styleUrl: './api-tester.component.css'
})
export class ApiTesterComponent implements OnInit {
  weatherForecasts: WeatherForecast[] = [];

  constructor(private client: Client) {
    let a = 0;
  }
  
  ngOnInit(): void {
    this.client.getWeatherForecast().subscribe(forecasts => {
      this.weatherForecasts = forecasts;
    });
  }
}
