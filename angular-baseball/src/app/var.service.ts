import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VarService {

  title = 'Angular Baseball';
  titleHTML = '<em><strong>ANGULAR</strong>Baseball</em>';

  constructor() { }

}
