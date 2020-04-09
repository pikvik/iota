import { Injectable } from '@angular/core';
import { composeAPI } from '@iota/core'
@Injectable({
  providedIn: 'root'
})
export class IotaService {
  provider: 'https://nodes.devnet.iota.org:443'
  iota=composeAPI({
    provider: this.provider
  });
  constructor() {    
    console.log(this.iota);
  }
  getNodeInfo()
  {
    this.iota.getNodeInfo().then(info => console.log(info))
    .catch(err => {
      console.log(err)
    })
  }
}
