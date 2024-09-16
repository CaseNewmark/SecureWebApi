import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeartbeatClientService } from './heartbeat-client.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'todo';

  constructor(private heartbeatService: HeartbeatClientService) { }

  ngOnInit(): void {
    this.heartbeatService.connect().subscribe();
  }
}