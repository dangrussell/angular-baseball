import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message, Messages } from '../interfaces/message';
import { InningHalfInterface, InningInterface } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  pitchResult = '';

  messagesUrl = 'assets/messages.json';

  messages: Messages;

  constructor(private http: HttpClient) {
    this.getMessages().subscribe(
      (fetchedData: Messages) => this.messages = {
        ...fetchedData
      }
    );
  }

  getMessages(): Observable<Messages> {
    return this.http.get<Messages>(this.messagesUrl);
  }

  randMessage(messagekind: string): string {
    const messageCollection: Messages = this.messages;
    const messageItem: Message = messageCollection.data.find(el => el.kind === messagekind);
    return messageItem.text[Math.floor(Math.random() * messageItem.text.length)];
  }

  message(messagekind: string, brs = 2): void {
    let message = this.randMessage(messagekind);
    for (let br = 1; br <= brs; br++) {
      message += '<br />';
    }
    this.pitchResult += message;
  }

  switchSides(ih: InningHalfInterface, i: InningInterface, o: string, messagekind = 'switchSides'): void {
    let message = this.randMessage(messagekind);
    let ihtext = ih.toporbot;
    if (ih.toporbot === 'bot') {
      ihtext = 'bottom';
    }
    message += '<br />We head to the ' + ihtext + ' of the ' + i.num.toString() + o + '.';
    this.pitchResult += message;
  }

}
