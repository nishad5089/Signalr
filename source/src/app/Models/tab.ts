import { Chatmessage } from '../Models/chatmessage';

/** Represent Tab class */
export class Tab {
  messageHistory: Chatmessage[];
  heading: string;
  title: string;

  constructor(
    heading: string= '',
    title: string = ''
  ) {
    this.heading = heading;
    this.title = title;
    this.messageHistory = [];
  }
}
