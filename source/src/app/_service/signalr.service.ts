import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Chatmessage } from '../Models/Chatmessage';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  messageReceived = new EventEmitter<Chatmessage>();
  connectionEstablished = new EventEmitter<Boolean>();
  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;
  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  sendChatMessage(message: Chatmessage) {
    this._hubConnection.invoke('SendMessage', message);
  }
  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/chathub')
      .build();
  }
  private startConnection(): any {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
         setTimeout(this.startConnection(), 5000);
      });
  }
  private registerOnServerEvents(): void {
    this._hubConnection.on('ReceiveMessage', (data: any) => {
      this.messageReceived.emit(data);
    });
  }

}
