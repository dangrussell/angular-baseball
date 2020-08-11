import { Injectable } from '@angular/core';

import { Message } from './../message/message';
import { InningHalfInterface, InningInterface } from './../game/game';

import * as messageData from './../message/messages.json';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = messageData.data;

  pitchResult = '';

  constructor() { }

  // let messages = messageData;

  randMessage(messageText: string[]): string {
    return messageText[Math.floor(Math.random() * messageText.length)];
  }

  message(messagekind: string, brs = 2): void {
    const messageItem: Message = this.messages.find(el => el.kind === messagekind);
    let message = this.randMessage(messageItem.text);
    for (let br = 1; br <= brs; br++) {
      message += '<br />';
    }
    this.pitchResult += message;
  }

  switchSides(ih: InningHalfInterface, i: InningInterface, o: string, messagekind = 'switchSides'): void{
    const messageItem: Message = this.messages.find(el => el.kind === messagekind);
    let message = this.randMessage(messageItem.text);
    let ihtext = ih.toporbot;
    if (ih.toporbot === 'bot'){
      ihtext = 'bottom';
    }
    message += '<br />We head to the ' + ihtext + ' of the ' + i.num.toString() + o + '.';
    this.pitchResult += message;
  }

}
