import { Component, OnInit } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-clock',
  template: `
    <p>
      clock works!
      {{dateTime | date: 'fullTime'}}
      {{timer | async}}
    </p>
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
