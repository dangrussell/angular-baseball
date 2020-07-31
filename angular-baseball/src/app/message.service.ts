import { Message } from './message/message';
import { Injectable } from '@angular/core';

import * as messageData from './message/messages.json';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = messageData.data;

  constructor() { }

  // let messages = messageData;

  randMessage(messageText: string[]): string {
    return messageText[Math.floor(Math.random() * messageText.length)];
  }

  message(messagekind: string): string {
    const messageItem: Message = this.messages.find(el => el.kind === messagekind);
    let message = this.randMessage(messageItem.text);
    message += '<br /><br />';
    return message;
  }

}
