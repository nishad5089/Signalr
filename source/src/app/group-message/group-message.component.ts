import { Component, OnInit, Input } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { User, MessageData, ChatService, ConnectionState } from '../_service/chat.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.css']
})
export class GroupMessageComponent implements OnInit {

  connectionState: Observable<string>;

  @Input() userData: User;
  private members: Array<User> = new Array<User>();
  private messages: Array<MessageData> = new Array<MessageData>();

  private isLoggingOut = false;

  private groups: Array<string> = [
      'Angular PH',
      'Programmers and Developers',
      'Online Filipino Freelancer',
      'Free For All'
  ];

  private messageData: MessageData;

  constructor(private _chatService: ChatService, private _notification: ToastrService ) {
       // Let's wire up to the signalr observables
       this.connectionState = this._chatService.connectionState$
       .map((state: any) => {
           return ConnectionState[state];
       });

   this._chatService.error$.subscribe(
       (error: any) => { console.warn(error); },
       (error: any) => { console.error('errors$ error', error); }
   );

   // Wire up a handler for the starting$ observable to log the
   //  success/fail result
   this._chatService.starting$.subscribe(
       (userId) => {
           console.log('signalr service has been started');
           console.log(userId);
           this.userData.UserId = userId;
       },
       () => { console.warn('signalr service failed to start!'); }
   );
   }

   ngOnInit() {

    // initialize Message Data
    this.messageData = new MessageData(this.userData);

    this._chatService.joinGroupEvent$.subscribe((data: User) => {
        console.log('welcome ' + JSON.stringify(data));
        this._notification.success('Join Group', 'Welcome to ' + data.GroupName + '!');

        // Update the user Data
        this.userData.IsMember = data.IsMember;

        this.messageData = new MessageData(this.userData);

        // Add user to members list
        this.members.push(data);

    }, err => this.errorHandler(err, 'Join Group'));

    // This will notify Old members that new members has been added
    this._chatService.notifyEvent$.subscribe((member: User) => {
        console.log('new member ' + JSON.stringify(member));
        this._notification.info('Join Group', member.Name + ' has joined the group.');

        this.members.push(member);

        // Notify New Members of your existence
        this.notifyNewMembers(this.userData);

    }, err => this.errorHandler(err, 'Join Group'));

    // This will notify New members of Old Members
    this._chatService.notifyNewMembersEvent$.subscribe((member: User) => {

        // Check if member is already in the list
        const memberExist = this.members.find(x => {
            return x.UserId === member.UserId;
        });

        // Prevent Duplicate Members in the list
        if (!memberExist) {
            this.members.push(member);
        }

        console.log('old member list ' + JSON.stringify(this.members));

    }, err => this.errorHandler(err, 'New Member notification'));

    this._chatService.messageReceivedEvent$.subscribe((data: MessageData) => {
        console.log('new message ' + JSON.stringify(data));
        this.messages.push(data);

    }, err => this.errorHandler(err, 'Receiving Message'));

    this._chatService.oldMessagesEvent$.subscribe((messages: Array<MessageData>) => {
        console.log('old message ' + JSON.stringify(messages));
        // Replace your current Messages with the Old messages including your messages in it
        this.messages = messages;

    }, err => this.errorHandler(err, 'Getting Old Messages'));

    this._chatService.leaveGroupEvent$.subscribe((user: User) => {

        this.members = this.members.filter((member: User) => member.UserId !== user.UserId);

        if (this.userData.UserId === user.UserId) {
            this.userData.IsMember = false;
            this.userData.GroupName = '';

            this.members = [];
            this.messages = [];

            if (this.isLoggingOut) {
                this.clearUserData();
            }
           } else {
            this._notification.success(user.Name + ' has left the group!');
        }

    });

}
private errorHandler(error: any, title: string) {
  console.log(title + ':' + error);
  this._notification.error(title, 'An error occured while processing your request!');
}
private sortMembers(): Array<User> {

  return this.members.sort((a: User, b: User) => {
      const nameA = a.Name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.Name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
          return -1;
      }
      if (nameA > nameB) {
          return 1;
      }

      // names must be equal
      return 0;
  });
}

private reConnect() {
  this._chatService.startConnection();
}

private joinGroup(groupName): void {
  this.userData.GroupName = groupName;
  this._chatService.joinGroup(this.userData);
}

private notifyNewMembers(user: User) {
  this._chatService.notifyNewMembers(user, this.messages);
}

private sendMessage() {
  this._chatService.sendMessage(this.messageData);

  this.messageData.Message = '';
}

private leaveGroup(): void {
  this._chatService.leaveGroup(this.userData);
}

private logout(): void {

  if (this.userData.IsMember && this.userData.GroupName) {
      this.isLoggingOut = true;
      this.leaveGroup();
  } else {
      this.clearUserData();
  }
}

private clearUserData() {
  this.userData.Email = '';
  this.userData.Name = '';

  localStorage.removeItem('userData');

  this._chatService.stopConnection();

  this.isLoggingOut = false;

}
}
