import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeartbeatClientService } from './services/heartbeat-client.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'todo';

  constructor(
    private heartbeatService: HeartbeatClientService,
    public authenticationService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.heartbeatService.connect().subscribe();
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
