import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  public new() {
    return new Player();
  }
}
