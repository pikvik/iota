import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  private ipfsss = new BehaviorSubject(null);
  ipfs$ = this.ipfsss.asObservable();

  constructor() { }
  setIpfs(ipfss) {
    this.ipfsss.next(ipfss);
  }
  set(path: string, value: string) {
    const content = this.ipfsss.value.files.Buffer.from(value);
    this.ipfsss.value.files.add({path, content});    
  }
  get(hash: string) {
    this.ipfsss.value.files.cat(hash);    
  }
}
