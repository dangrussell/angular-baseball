import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InningHalfInterface, InningInterface } from '../interfaces/game';
import { Message, Messages } from '../interfaces/message';


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

  public message(messagekind: string, brs = 2): void {
    let message = this.randMessage(messagekind);
    for (let br = 1; br <= brs; br++) {
      message += '<br />';
    }
    this.pitchResult += message;
  }

  public log(...args: any[]): void {
    console.log(...args);
    this.pitchResult += args.join(' ') + '<br /><br />';
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

  private getMessages(): Observable<Messages> {
    return this.http.get<Messages>(this.messagesUrl);
  }

  private randMessage(messagekind: string): string {
    const messageCollection: Messages = this.messages;
    const messageItem: Message = messageCollection.data.find(el => el.kind === messagekind);
    return messageItem.text[Math.floor(Math.random() * messageItem.text.length)];
  }

}
