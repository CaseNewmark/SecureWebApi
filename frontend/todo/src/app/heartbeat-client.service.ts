import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeartbeatClientService {
  private hubConnection: signalR.HubConnection;

  constructor() { 
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5178/heartbeat') // SignalR hub URL
      .build();
  }
  
  connect(): Observable<void> {
    return new Observable<void>((observer) => {
      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection established with SignalR hub');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.error('Error connecting to SignalR hub:', error);
          observer.error(error);
        });
    });
  }

  bumpOccurred(): Observable<number> {
    return new Observable<number>((observer) => {
      this.hubConnection.on('BumpOccurred', (message: number) => {
        observer.next(message);
      });
    });
  }

  resetMusculature(): void {
    this.hubConnection.invoke('Reset');
  }
}
