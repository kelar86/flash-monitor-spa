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

  constructor() {  }

  ngOnInit() {

  }

}
