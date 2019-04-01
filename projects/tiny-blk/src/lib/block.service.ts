import { Injectable } from '@angular/core';
import { Block } from './block';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  public colors = [
    null,
    '#e72944',
    '#1086ff',
    '#35d440',
    'purple',
    'black',
    'green',
    'gray'
  ];

  private createPeice(type: string): number[][] {
    if (type === 'T') {
        return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
        ];

    } else if (type === 'O') {
        return [
        [2, 2],
        [2, 2],
        ];

    } else if (type === 'L') {
        return [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3]
        ];

    } else if (type === 'J') {
        return [
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0]
        ];

    } else if (type === 'I') {
        return [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0]
        ];

    } else if (type === 'S') {
        return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0]
        ];

    } else if (type === 'Z') {
        return [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
        ];

    }

  }// end function


  constructor() { }

  public get(letter: string): Block {
    return new Block(this.createPeice(letter));
  }
  public randomBlock(): Block {
    const peices = 'ILJOSZT';
    // tslint:disable-next-line:no-bitwise
    return new Block(this.createPeice(peices[peices.length * Math.random() | 0]));
  }

}
