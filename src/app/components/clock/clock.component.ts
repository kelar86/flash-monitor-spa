import { Component, OnInit } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';


@Component({
  selector: 'app-clock',
  template: `
    <div class="clock">
      <time class="cloc__time">
        {{dateTime | date: 'd MMMM yyyy'}}
        <strong>{{dateTime |date: 'HH:mm:ss'}}</strong>
        {{dateTime |date: '(z)' }}
      </time>
    </div>
  `,
  styles: []
})
export class ClockComponent implements OnInit {

  constructor() { }

  dateTime = new Date();
  private timer;
  private subscribtion: Subscription;

  ngOnInit() {
    this.timer = timer(1000, 1000);
    this.subscribtion = this.timer.subscribe(() => this.dateTime = new Date());
  }


  ngOndestroy() {
    this.subscribtion.unsubscribe()
  }
}
