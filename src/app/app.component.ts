import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GameService } from 'projects/tiny-blk/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'tiny-blk';
  constructor(private gmSrv: GameService) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @ViewChild('dropBlock') canvas: ElementRef;

  ngAfterViewInit(): void {
    // const cv = document.getElementById('dropBlock');
    const cv = this.canvas.nativeElement;
    this.gmSrv.start(cv as HTMLCanvasElement);
  }
}
