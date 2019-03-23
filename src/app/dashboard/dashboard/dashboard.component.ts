import { Component, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject, timer, Subject } from 'rxjs';
import { AlertList, Alert } from 'src/app/models/alert';
import { Application, CrashedApp } from 'src/app/models/application';

import { MonitorApiService } from 'src/app/services/monitor-api.service';
import { StorageService } from 'src/app/services/storage.service';
import { Catalog } from 'src/app/models/catalogs';
import { map, takeUntil } from 'rxjs/operators';
import { Problem } from 'src/app/models/problem';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container">
    <app-header-container
        [catalog]="catalog"
        [problems]="problems"
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

  public alerts = new Subject<any>();
  public destroy$ = new Subject<any>();

  public filter = '';

  private interval;


  public applications: Observable<Application[]>;
  public problems: Problem[];

  public byApplication: Observable<Alert[]>;
  public byControl: Observable<Alert[]>;
  public isPlaned: Observable<Alert[]>;

  public user: User;

  constructor(private api: MonitorApiService, private storage: StorageService) {
  }
  public catalog: Catalog = new Catalog();

  ngOnInit() {

   this.interval = setInterval(() => {
      this.api.getAlerts(this.filter).pipe(map(item => new AlertList(item)),
      takeUntil(this.destroy$))
      .subscribe(v => this.alerts.next(v));
    }, 500);
  

   
    this.alerts.subscribe(value => {
      this.byApplication = of(value).pipe(
        map(list => list.getAlertsByApplicationCategory()),
        takeUntil(this.destroy$));

      this.byControl = of(value).pipe(
        map(list => list.getAlertsByControlCategory()), 
        takeUntil(this.destroy$));

      this.isPlaned = of(value).pipe(
        map(list => list.getPlanedAlerts()),
        takeUntil(this.destroy$));

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
      ),
      takeUntil(this.destroy$));
    });

  }

  applyFilter(data) {
    this.filter = data.name;
  }

  ngOnDestroy(){
    this.destroy$.next('destroy');
    if (this.interval) {
      clearInterval(this.interval);
    }
  }


}
