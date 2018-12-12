import { SignalrService } from './../_service/signalr.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Chatmessage } from '../Models/Chatmessage';
import { Tab } from '../Models/tab';

@Component({
  selector: 'app-chat',
  templateUrl: './Chat.component.html',
  styleUrls: ['./Chat.component.css']
})
export class ChatComponent implements OnInit {

  chatMessage: Chatmessage;
  canSendMessage: boolean;
  tabs: Tab[];
  currentRoom: string;

  ngOnInit(): void {
  }
  constructor(
    private signalrService: SignalrService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
    this.chatMessage = new Chatmessage();
    this.tabs = [];
    this.tabs.push(new Tab('Lobby', 'Welcome to lobby'));
    this.tabs.push(new Tab('SignalR', 'Welcome to SignalR Room'));
    this.currentRoom = 'Lobby';
  }
  sendMessage() {
    if (this.canSendMessage) {
      this.chatMessage.room = this.currentRoom;
      this.signalrService.sendChatMessage(this.chatMessage);
    }
  }
  OnRoomChange(room) {
    this.currentRoom = room;
  }
  private subscribeToEvents(): void {
    this.signalrService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });
    this.signalrService.messageReceived.subscribe((message: Chatmessage) => {
      this._ngZone.run(() => {
        this.chatMessage = new Chatmessage();
        const room = this.tabs.find(t => t.heading === message.room);
        if (room) {
            room.messageHistory.push(new Chatmessage(message.user, message.message, message.room));
        }
      });
    });
  }

}
