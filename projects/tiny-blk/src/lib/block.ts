import { Offset } from './offset';

export class Block {

    public offset = new Offset();

    constructor(public shape: number[][]) {

    }

    public rotate(dir: number): void {
        let tmpPeice = null;
        for (let y = 0; y < this.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                tmpPeice = this.shape[x][y];
                this.shape[x][y] = this.shape[y][x];
                this.shape[y][x] = tmpPeice;
            }
        }
        if (dir > 0) {
            this.shape.forEach(row => row.reverse());
        } else {
            this.shape.reverse();
        }
    }
}
