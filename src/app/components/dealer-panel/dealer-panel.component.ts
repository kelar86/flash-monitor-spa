import { Application } from './../../models/application';
import { AlertList } from './../../models/alert';
import { Alert } from '../../models/alert';
import { Component, OnInit, Input } from '@angular/core';
import { map, filter, merge } from 'rxjs/operators';
import { Observable, pipe, of } from 'rxjs';


@Component({
  selector: 'app-dealer-panel',
  template: `
    
    <app-emergency-icons 
      [applications]="(applications | async)"
      ></app-emergency-icons>
    
    <div class="grid-container">
      <h4>Активные алерты по приложениям</h4>

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

  @Input() applications: Observable<Application[]>;
  @Input() applicationsCrashed: Observable<Application[]>;
  @Input() applicationsCrashedByControl: Observable<Application[]>;
  @Input() byApplication: Observable<Alert[]>;
  @Input() byControl: Observable<Alert[]>;
  @Input() isPlaned: Observable<Alert[]>;

  constructor() {
  }


  ngOnInit() {

  }

}
