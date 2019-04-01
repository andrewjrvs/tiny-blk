import { BlockService } from './block.service';
import { Block } from './block';

export class Board {
    private el;
    private arena;
    private context: CanvasRenderingContext2D ;


    constructor(
        private canvas: HTMLCanvasElement,
        private width: number,
        private height: number,
        private blksrv: BlockService
        ) {
            this.reset();
            this.context = canvas.getContext('2d');
            this.context.scale(1, 1);
    }

    public reset() {
        this.arena = this.createMatrix(this.width, this.height);
    }

    public drawBoard(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw(this.arena, null, false);
    }

    public draw(shape: number[][], point: {x: number, y: number}, shadow: boolean) {
        point = point || {x: 0, y: 0};
        point.x = point.x || 0;
        point.y = point.y || 0;
        shape = shape || [[]];
        shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.context.fillStyle = this.blksrv.colors[value];
                    this.context.fillRect(x + point.x, y + point.y, 1, 1);
                    if (shadow) {
                        this.context.shadowColor = '#999';
                        this.context.shadowBlur = 20;
                        this.context.shadowOffsetX = 15;
                        this.context.shadowOffsetY = 15;
                    }
                }
            });
        });
    }

    public arenaSweep(): number {
        let rowCount = 1;
        let rtnPoints = 0;
        outer: for (let y = this.arena.length - 1; y > 0; --y) {
            for (let x = 0; x < this.arena[y].length; ++x) {
                if (this.arena[y][x] === 0) {
                    continue outer;
                }
            }
            const row = this.arena.splice(y, 1)[0].fill(0);
            this.arena.unshift(row);
            ++y;

            rtnPoints += rowCount * 10;
            rowCount *= 2;
        }
        return rtnPoints;
    }

    public checkForHit(shape: Block): boolean {
        const m = shape.shape;
        const o = shape.offset;

        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                    (!this.arena[y + o.y] ||
                    this.arena[y + o.y][x + o.x] !== 0)) {
                        return true;
                }
            }
        }
        return false;
    }

    public merge(shape: Block): void {
        shape.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.arena[y + shape.offset.y][x + shape.offset.x] = value;
                }
            });
        });
    }

    private createMatrix(w, h): number[][] {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }
}
