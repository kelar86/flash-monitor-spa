import { Component, OnInit } from '@angular/core';
import { MonitorApiService } from 'src/app/services/monitor-api.service';

@Component({
  selector: 'app-dash-container',
  template: `
    <p>
      dash-container works!
    </p>
    <pre>{{alerts | json}}</pre>
  `,
  styles: []
})
export class DashContainerComponent implements OnInit {

  private alerts;

  constructor(private api: MonitorApiService) {
   }

  ngOnInit() {

    this.api.getAlerts('')
    .subscribe(value => this.alerts = value);
  }

}
