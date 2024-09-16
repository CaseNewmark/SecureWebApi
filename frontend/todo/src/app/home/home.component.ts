import { Component, OnInit } from '@angular/core';
import { WeatherForecast, WeatherForecastService } from '../weather-forecast.service';
import { Observable } from 'rxjs';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { HeartbeatClientService } from '../heartbeat-client.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbProgressbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  weatherForecasts: Array<WeatherForecast> = [];
  counter: number = 0;

  constructor(
    private weatherForecastService: WeatherForecastService,
    private heartbeatService: HeartbeatClientService
  ) {}

  ngOnInit()
  {
    this.weatherForecastService.getWeatherForecasts().subscribe(forecasts => {
      this.weatherForecasts = forecasts;
    });
    this.heartbeatService.bumpOccurred().subscribe(counter => this.counter = counter);
  }

  clickResetButton() {
    this.heartbeatService.resetMusculature();
  }
}
