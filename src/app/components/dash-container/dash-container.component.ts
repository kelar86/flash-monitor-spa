import { Alert } from './../../models/alert';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MonitorApiService } from 'src/app/services/monitor-api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dash-container',
  template: `
    <p>
      <app-alert-grid [alerts]="(alerts | async)">

      </app-alert-grid>
    </p>
  `,
  styles: []
})
export class DashContainerComponent implements OnInit {

  private alerts: Alert[];

  constructor(private api: MonitorApiService) {
  }

  ngOnInit() {

    this.api.getAlerts('')
      .pipe(map((value: []) => value.map(item => new Alert().deserialize(item))));

  }

}
