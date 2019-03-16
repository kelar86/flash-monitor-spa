import { Alert } from './../../models/alert';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-alert-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Нерабочие приложения</th>
        <th scope="col">Описание</th>
        <th scope="col">Начало (план)</th>
        <th scope="col">Окончание (план)</th>
        <th scope="col">агрегат/кузов</th>
      </tr>
    </thead>
    </table>
  `,
  styles: []
})
export class AlertGridComponent implements OnInit {

  @Input() alerts: Alert[];

  constructor() { }

  ngOnInit() {
  }

}
