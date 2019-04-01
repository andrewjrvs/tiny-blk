import { Injectable, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TinyBlkListenerService implements OnDestroy {
  private keyEvent = new Subject<string>();

  public action = this.keyEvent.asObservable();

  constructor(@Inject(DOCUMENT) private document: any) {
    this.fnKeyDown = this.fnKeyDown.bind(this);

    document.addEventListener('keydown', this.fnKeyDown);
  }

  private fnKeyDown($event: KeyboardEvent): void {
    this.keyEvent.next($event.key);
  }

  public ngOnDestroy(): void {
    this.keyEvent.complete();
    document.removeEventListener('keydown', this.fnKeyDown);
  }
}
