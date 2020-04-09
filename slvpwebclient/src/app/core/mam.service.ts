import { Injectable } from '@angular/core';
import * as Mam from '@iota/mam/lib/mam.web.min.js';

@Injectable({
  providedIn: 'root'
})
export class MamService {
  provider = 'https://nodes.devnet.iota.org'
  mState: Mam.MamState;
  constructor() {
    this.mState = Mam.init(this.provider);
    console.log(this.mState);
  }
}
