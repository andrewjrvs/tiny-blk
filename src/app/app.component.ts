import { Component, OnInit } from '@angular/core';
import { GameService } from 'projects/tiny-blk/src/lib/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'tiny-blk';
  constructor(private gmSrv: GameService) {

  }

  ngOnInit(): void {
    const cv = document.getElementById('dropBlock');
    this.gmSrv.start(cv as HTMLCanvasElement);
  }
}
