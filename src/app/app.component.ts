import { AuthenticationModalComponent } from './components/authentication-modal/authentication-modal.component';
import { ProblemFormComponent } from './components/problem-form/problem-form.component';
import { AlertList, Alert } from './models/alert';
import { Application, CrashedApp } from './models/application';
import { Catalog } from './models/catalogs';
import { Component, OnInit } from '@angular/core';
import { MonitorApiService } from './services/monitor-api.service';
import { map } from 'rxjs/operators';
import { Observable, merge, Subject, of } from 'rxjs';
import { StorageService } from './services/storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  template: `
   <router-outlet></router-outlet>
`,
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  public alerts: Observable<AlertList>;
  public applications: Observable<Application[]>;

  public byApplication: Observable<Alert[]>;
  public byControl: Observable<Alert[]>;
  public isPlaned: Observable<Alert[]>;


  constructor(private api: MonitorApiService, private storage: StorageService, private modalService: NgbModal) {
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
