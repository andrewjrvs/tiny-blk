import { Injectable } from '@angular/core';
import { Board } from './board';
import { BlockService } from './block.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private blkSrv: BlockService) { }

  public new(canvas: HTMLCanvasElement): Board {
    return new Board(canvas, this.blkSrv);
  }
}
