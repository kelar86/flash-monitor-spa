import { Alert, AlertList } from './../../models/alert';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-alert-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col" *ngIf="isControlAlerts()">Нерабочие блоки управления</th>
          <th scope="col">Нерабочие приложения</th>
          <th scope="col">Описание</th>
          <th scope="col">Начало (план)</th>
          <th scope="col">Окончание (план)</th>
          <th scope="col">агрегат/кузов</th>
        </tr>
      </thead>
      <tbody *ngIf="alerts">
        <tr *ngFor="let alert of alerts; index as i">
          <td *ngIf="isControlAlerts()">
          <span *ngFor="let control of alert.control">
              <img src="{{control.icon}}" id="control-img" alt="image">
              <label for="control-img">{{control.name}}</label>
          </span>
          </td>
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
    <p *ngIf="alerts.length === 0">
      <ngb-alert [dismissible]="false" type="success" >
        Активные алерты в данной категории отсутствуют.
      </ngb-alert>
   </p>

  `,
  styles: [`
  thead {
    background: gainsboro;
  }
  img {
    width: 30px;
    display: block;
  }
  `]
})
export class AlertGridComponent implements OnInit {

  @Input() alerts: Alert[];

  constructor() { }

  ngOnInit() {

  }

  // Check that all alerts are 'by control' category.
  // TODO: Refactoring. Move this logic to better place, or use class polymorphism
  isControlAlerts() {
    return this.alerts && this.alerts.filter(item => item.category == 'CONTROL_ALERT').length === this.alerts.length;
  }

}
