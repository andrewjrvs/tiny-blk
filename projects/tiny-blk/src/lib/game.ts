import { Board } from './board';
import { Player } from './player';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Block } from './block';
import { BlockService } from './block.service';
import { BoardService } from './board.service';
import { PlayerService } from './player.service';

export class Game {

    private board: Board;
    private player: Player;
    private highScore = new BehaviorSubject<number>(0);
    private newPeiceList: Block[] = [];
    private lastTime = 0;
    private dropCounter = 0;
    private dropInterval = 1000;

    constructor(private canvas: HTMLCanvasElement,
                private blkSrv: BlockService,
                private brdSrv: BoardService,
                private plrSrv: PlayerService) { }

    public reset() {
        this.newPeiceList.length = 0;
        this.populatePeiceList();
        this.player.reset();
        this.player.shape = this.newPeiceList.shift();
        this.player.shape.offset.x = 3;
        this.board.reset();
        this.populatePeiceList();
    }

    private clearHighScore(): void {
        this.highScore.next(0);
    }

    public start(): void {
        this.board = this.brdSrv.new(this.canvas, 12, 20);
        this.player = this.plrSrv.new();
        this.player.score$.pipe(
            filter((scr) => scr > this.highScore.value))
            .subscribe((scr) => this.highScore.next(scr));
        this.reset();
    }

    public playerRotate(dir: number): void {
        let offset = 1;
        const pos = this.player.shape.offset.x;
        this.player.rotate(dir);
        while (this.board.checkForHit(this.player.shape)) {
            this.player.move(offset);
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.player.shape.shape[0].length) {
                this.player.rotate(-dir);
                this.player.shape.offset.x = pos;
                return;
            }
        }// wend
    }

    public playerMove(dir: number) {
        this.player.move(dir);
        if (this.board.checkForHit(this.player.shape)) {
             this.player.move(-1 * dir);
        }
    }

    public playerDrop(): void {
        this.player.drop();
        if (this.board.checkForHit(this.player.shape)) {
            this.player.drop(true);
            this.board.merge(this.player.shape);
            this.player.updateScore(this.board.arenaSweep());
            this.player.shape = this.newPeiceList.shift();

            this.player.shape.offset.x = 8;
            this.player.shape.offset.y = 0;

            if (this.board.checkForHit(this.player.shape)) {
                // Game over
                console.log( 'Game Over');
                this.reset();
            }
            this.populatePeiceList();
        }
        this.dropCounter = 0;
    }

    public update(time): void {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.playerDrop();
        }

        this.board.drawBoard();
        this.board.draw(this.player.shape.shape, this.player.shape.offset, true);
    }

    private populatePeiceList(): void {
        for (let i = 0, len = 5 - this.newPeiceList.length; i < len; i++) {
            this.newPeiceList.push(this.blkSrv.randomBlock());
        }
    }
}
