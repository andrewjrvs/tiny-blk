import { Block } from './block';
import { BehaviorSubject } from 'rxjs';

export class Player {
    public shape: Block;
    private score = new BehaviorSubject<number>(0);
    public score$ = this.score.asObservable();

    constructor() {}

    public reset() {
        this.shape = null;
        this.score.next(0);
    }

    public drop(reverse: boolean = false): void {
        if (reverse) {
            this.shape.offset.y--;
        } else {
            this.shape.offset.y++;
        }
    }

    public move(dir: number) {
        this.shape.offset.x += dir;
    }

    public rotate(dir: number) {
        this.shape.rotate(dir);
    }

    public updateScore(score: number) {
        this.score.next(score);
    }
}
