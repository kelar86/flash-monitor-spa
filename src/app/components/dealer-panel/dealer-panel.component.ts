import { Alert } from '../../models/alert';
import { Component, OnInit, Input } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dealer-panel',
  template: `
    <div>
      <h4>Активные алерты по приложениям</h4>
      
        <app-emergency-icons [alerts]="(alerts | async)"></app-emergency-icons>
        <app-alert-grid [alerts]="(byApplication | async)"></app-alert-grid>
      
      <h4>Частичная потеря работоспособности</h4>
        <app-alert-grid [alerts]="(byControl | async)"></app-alert-grid>
      <h4>Плановые работы</h4>
        <app-alert-grid [alerts]="(isPlaned | async)"></app-alert-grid>
    <div>
  `,
  styleUrls: ['./dealer-panel.component.css']
})
export class DealerPanelComponent implements OnInit {

  @Input() alerts: Observable<Alert[]>;

  public byApplication: Observable<Alert[]>;
  public byControl: Observable<Alert[]>;;
  public isPlaned: Observable<Alert[]>;;

  constructor() {
  }


  ngOnInit() {

    this.byApplication = this.alerts.pipe(map(list => list.filter(alert => alert.category === 'APPLICATION_ALERT')));
    this.byControl = this.alerts.pipe(map(list => list.filter(alert => alert.category === 'CONTROL_ALERT')));
    this.isPlaned = this.byApplication.pipe(map(list => list.filter(alert => alert.is_planed)));
  }

}
