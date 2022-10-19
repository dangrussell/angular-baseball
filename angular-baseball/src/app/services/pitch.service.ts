import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { swing } from '../actions/swing.actions';
import { Player } from './player.service';
import { rand, VarService } from './var.service';

@Injectable({
  providedIn: 'root'
})
export class PitchService {

  constructor(
    private readonly varService: VarService,
    private readonly store: Store,
  ) { }

  public swing(inZone: boolean, player: Player): boolean {
    this.store.dispatch(swing());
    let contact: number;

    if (inZone) {
      contact = this.varService.ZCONTACT;
    } else {
      contact = this.varService.OCONTACT;
    }

    contact = contact * (1 + (player.contact - 50) / 100);

    console.log('SWING! Contact chance = ', contact);

    const madeContact: boolean = rand(1, 100) <= contact;

    return madeContact;
  }

}
