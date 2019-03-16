import { Catalog } from './models/catalogs';
import { Component } from '@angular/core';
import { MonitorApiService } from './services/monitor-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public alerts;

  constructor(private api: MonitorApiService) {
  }
  public catalog: Catalog = new Catalog();

  ngOnInit() {
    this.alerts = this.api.getAlerts('');
  }
}
