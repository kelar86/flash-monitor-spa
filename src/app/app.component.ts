import { AlertList, Alert } from './models/alert';
import { Application, CrashedApp } from './models/application';
import { Catalog } from './models/catalogs';
import { Component } from '@angular/core';
import { MonitorApiService } from './services/monitor-api.service';
import { map } from 'rxjs/operators';
import { Observable, merge, Subject, of } from 'rxjs';

@Component({
  selector: 'app-root',
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
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  public alerts: Observable<AlertList>;
  public applications: Observable<Application[]>;

  public byApplication: Observable<Alert[]>;
  public byControl: Observable<Alert[]>;;
  public isPlaned: Observable<Alert[]>;;


  constructor(private api: MonitorApiService) {
  }
  public catalog: Catalog = new Catalog();

  ngOnInit() {
    this.alerts = this.api.getAlerts('').pipe(map(item => new AlertList(item)));

    this.byApplication = this.alerts.pipe(
      map(list => list.getAlertsByApplicationCategory()));

    this.byControl = this.alerts.pipe(
      map(list => list.getAlertsByControlCategory()));

    this.isPlaned = this.alerts.pipe(
      map(list => list.getPlanedAlerts()));

    
   this.applications = this.alerts.pipe(map(
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
        if(is_actual){
          return acc;
        }
        acc.push(item);
        return acc;
      }, [])
      ));

  }
  
  applyFilter(data) {
    console.log(data);
    this.api.getAlerts(data.name).pipe(map(item => new AlertList(item)))
      .subscribe(v => console.log(v));
  }


}
