import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { AlertList, Alert } from 'src/app/models/alert';
import { Application, CrashedApp } from 'src/app/models/application';
import { MonitorApiService } from 'src/app/services/monitor-api.service';
import { StorageService } from 'src/app/services/storage.service';
import { Catalog } from 'src/app/models/catalogs';
import { map, takeUntil, mergeMap, first } from 'rxjs/operators';
import { Problem } from 'src/app/models/problem';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container-fluid">
      <app-header-container
          [user]="user"
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
export class DashboardComponent implements OnInit, OnDestroy {
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

  constructor(
      private api: MonitorApiService,
      private storage: StorageService
    ) {
    this.storage.getCurrentUser()
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      this.user = value;
    });
  }
  public catalog: Catalog = new Catalog();

  ngOnInit() {
    this.storage.loadDataFromApi();
    this.update('');
  }

  applyFilter(data) {
    this.update(data.name);
  }

  update(filter) {
    this.api.getAlerts(filter).pipe(
      map(item => new AlertList(item)),
      takeUntil(this.destroy$)
    )
      .subscribe(v => {
        this.alerts.next(v);
        // FIXME INNER SUBSCRIBTION
        this.storage.getUserProblems(this.user).pipe(first()).subscribe(v => this.problems = v);
      });



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
            if (item.alert_category === 'APPLICATION_ALERT') {
              var filtered = acc.filter(v => v.id !== item.id);
              filtered.push(item);
              return filtered;
            }

            if (item.alert_category === 'CONTROL_ALERT') {
              if (acc.filter(v => {
              
               return  v.id === item.id
              })[0]) {
                return acc;
              } else {
                acc.push(item);
                return acc;
              }

            }
            
          }, [])
          .filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
          })
          
        
      ),
        takeUntil(this.destroy$));
    });
  }

  ngOnDestroy() {
    this.destroy$.next('destroy');
    if (this.interval) {
      clearInterval(this.interval);
    }
  }


}
