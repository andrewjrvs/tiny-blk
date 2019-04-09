import { Injectable } from '@angular/core';
import { Game } from './game';
import { BlockService } from './block.service';
import { BoardService } from './board.service';
import { PlayerService } from './player.service';
import { TinyBlkListenerService } from './tiny-blk-listener.service';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private game: Game;
  constructor(private blkSrv: BlockService,
              private brdSrv: BoardService,
              private plrSrv: PlayerService,
              private lsnSrv: TinyBlkListenerService) {

  }

  private update(time) {
    // console.log('update');
    this.game.update(time);
    requestAnimationFrame(this.update.bind(this));
  }

  public start(canvas: HTMLCanvasElement) {
    const ng = new Game(canvas, this.blkSrv, this.brdSrv, this.plrSrv);
    const actionText: {[key: string]: any} = {
      ArrowLeft: ng.playerMove.bind(ng, -1),
      ArrowRight: ng.playerMove.bind(ng, 1),
      ArrowDown: ng.playerDrop.bind(ng),
      q: ng.playerRotate.bind(ng, -1),
      w: ng.playerRotate.bind(ng, 1),
      ' ' : ng.pause.bind(ng)
    };
    this.lsnSrv.action.pipe(
      map((act) => actionText[act]),
      filter((fn) => fn && typeof fn === 'function'),
      ).subscribe(fn => fn.call());
    ng.start();
    this.game = ng;
    this.update(0);
  }

}
