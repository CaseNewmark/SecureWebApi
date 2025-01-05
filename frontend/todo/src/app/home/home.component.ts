import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { HeartbeatClientService } from '../services/heartbeat-client.service';
import { ApiClientService, WeatherForecast } from '../services/api-client-service';

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
    private weatherForecastService: ApiClientService,
    private heartbeatService: HeartbeatClientService
  ) {}

  ngOnInit()
  {
    this.weatherForecastService.getWeatherForecast().subscribe(forecasts => {
      this.weatherForecasts = forecasts;
    });
    this.heartbeatService.bumpOccurred().subscribe(counter => this.counter = counter);
  }

  clickResetButton() {
    this.heartbeatService.resetMusculature();
  }
}
