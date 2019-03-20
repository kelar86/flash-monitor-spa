import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AlertList, Alert } from 'src/app/models/alert';
import { Application, CrashedApp } from 'src/app/models/application';

import { MonitorApiService } from 'src/app/services/monitor-api.service';
import { StorageService } from 'src/app/services/storage.service';
import { Catalog } from 'src/app/models/catalogs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container">
    <app-header-container
        [catalog]="catalog"
        (filterChange)="applyFilter($event)">
    </app-header-container>

    <app-dealer-panel
        [byApplication]="byApplication"
        [byControl]="byControl"
        [isPlaned]="isPlaned"
        [applications]="applications"
      >
    </app-dealer-panel>
</div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {

  public alerts: Observable<AlertList>;
  public applications: Observable<Application[]>;

  public byApplication: Observable<Alert[]>;
  public byControl: Observable<Alert[]>;
  public isPlaned: Observable<Alert[]>;


  constructor(private api: MonitorApiService, private storage: StorageService) {
  }
  public catalog: Catalog = new Catalog();

  ngOnInit() {



    // TODO: DRY!  MOVE IT TO A SERVICE. AND HAS MANY HTTP

    this.alerts = this.api.getAlerts('').pipe(map(item => new AlertList(item)));

    this.alerts.subscribe(value => {
      this.byApplication = of(value).pipe(
        map(list => list.getAlertsByApplicationCategory()));

      this.byControl = of(value).pipe(
        map(list => list.getAlertsByControlCategory()));

      this.isPlaned = of(value).pipe(
        map(list => list.getPlanedAlerts()));

      this.applications = of(value).pipe(map(
        list => list.getAlerts()
          .map(alert => {
            if (alert.category === 'APPLICATION_ALERT') {
              return new CrashedApp('APPLICATION_ALERT').deserialize(alert.application);
            }
            if (alert.category === 'CONTROL_ALERT') {
              return new CrashedApp('CONTROL_ALERT').deserialize(alert.application);
            }
          })
          .reduce((acc, item): Application[] => {

            const is_actual = acc.filter(app => app.id !== item.id && item.alert_category !== 'APPLICATION_ALERT')[0];
            if (is_actual) {
              return acc;
            }
            acc.push(item);
            return acc;
          }, [])
      ));
    });


  }

  applyFilter(data) {

    // TODO: DRY!  MOVE IT TO A SERVICE

    console.log(data);

    this.alerts = this.api.getAlerts(data.name).pipe(map(item => new AlertList(item)));

    this.alerts.subscribe(value => {
      this.byApplication = of(value).pipe(
        map(list => list.getAlertsByApplicationCategory()));

      this.byControl = of(value).pipe(
        map(list => list.getAlertsByControlCategory()));

      this.isPlaned = of(value).pipe(
        map(list => list.getPlanedAlerts()));

      this.applications = of(value).pipe(map(
        list => list.getAlerts()
        .map(alert => {
          if (alert.category === 'APPLICATION_ALERT') {
            return new CrashedApp('APPLICATION_ALERT').deserialize(alert.application);
          }
          if (alert.category === 'CONTROL_ALERT') {
            return new CrashedApp('CONTROL_ALERT').deserialize(alert.application);
          }
        })
        .reduce( (acc, item): Application[] => {

          const is_actual = acc.filter(app => app.id !== item.id && item.alert_category !== 'APPLICATION_ALERT')[0];
          if (is_actual) {
            return acc;
          }
          acc.push(item);
          return acc;
        }, [])
        ));
    });
  }


}
