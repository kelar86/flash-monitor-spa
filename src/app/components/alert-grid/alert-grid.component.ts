import { Alert } from './../../models/alert';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-alert-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Нерабочие приложения</th>
          <th scope="col">Описание</th>
          <th scope="col">Начало (план)</th>
          <th scope="col">Окончание (план)</th>
          <th scope="col">агрегат/кузов</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let alert of alerts; index as i">
          <td>
          {{alert.application.name}}
          </td>
          <td>
          {{alert.description}}
          </td>
          <td>
          {{alert.start_date | date:"d.MM.yy HH:mm" }}
          </td>
          <td>
          {{alert.finish_date | date:"d.MM.yy HH:mm" }}
          </td>
          <td>
            <span *ngIf="alert.unit.length > 0 ||
                         alert.body_type.length > 0">
                  <span *ngFor="let unit of alert.unit">{{unit.name}}</span>
                   / 
                  <span *ngFor="let type of alert.body_type">{{type.name}}</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>  
    
  `,
  styles: [`
  thead {
    background: gainsboro;
  }
  `]
})
export class AlertGridComponent implements OnInit {

  @Input() alerts: Alert[];

  constructor() { }

  ngOnInit() {

  }

}
