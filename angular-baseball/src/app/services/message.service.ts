import { VarService } from './var.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, Messages } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  pitchResult = '';

  messagesUrl = 'assets/messages.json';

  messages: Messages;

  constructor(
    private http: HttpClient,
    private varService: VarService) {
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

  switchSides(toporbot: string, i: number, messagekind = 'switchSides'): void {
    let message = this.randMessage(messagekind);
    let ihtext = toporbot;
    if (toporbot === 'bot') {
      ihtext = 'bottom';
    }
    const ordinal = this.varService.ordinal(i);
    message += '<br />We head to the ' + ihtext + ' of the ' + i.toString() + ordinal + '.';
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
