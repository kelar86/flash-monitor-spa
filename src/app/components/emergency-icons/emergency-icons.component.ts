import { Application } from './../../models/application';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-emergency-icons',
  template: `
  <div class="container">
    <div class="application-container">
      <div class="app" *ngFor="let application of applications"
          [style.background-color]= "application.alert_category === 'CONTROL_ALERT' ? 'yellow' : 'red'" >
            <img class="float-center" src="{{application.icon}}" alt="{{application.name}}">
        </div>
    </div>
  </div>  
  `,
  styles: [`
    img {
      max-width: 60px;
      max-height: 60px; 
    }
    .application-container {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      justify-items: center;
      align-items: center;
      grid-gap: 1rem;
      height: 60px;
    }
    .app {
      display: grid;
      align-items: center;
      justify-items: center;
      width:100%;
      height:100%; 
    }
    .container {
      margin-top: 20px;
    }
  `]
})
export class EmergencyIconsComponent implements OnInit {

  @Input() applications: Application[];


  constructor() { }


  ngOnInit() {
  }


}