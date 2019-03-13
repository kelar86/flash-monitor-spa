import { Component, OnInit } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-clock',
  template: `
    <div class="clock">
      <time class="cloc__time">
        {{dateTime | date: 'd MMMM yyyy'}} <strong>{{dateTime |date: 'hh:mm:ss (z)'}}</strong>
      </time>
    </div>
  `,
  styles: []
})
export class ClockComponent implements OnInit {

  constructor() { }

  private dateTime = new Date();
  private timer;
  private subscribtion: Subscription;

  ngOnInit() {
    this.timer = timer(1000, 1000);
    this.subscribtion = this.timer.subscribe(() => this.dateTime = new Date());

  }


  ngOndestroy() {

  }
}
