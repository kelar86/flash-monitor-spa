import { Alert } from './../../models/alert';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-emergency-icons',
  template: `
    <div class="alert-container">
      <div class="alert" *ngFor="let alert of alerts"
          [style.background-color]= "(alert.category === 'CONTROL_ALERT') ? 'yellow' : 'red'" >
          <div class="alert__image">
            <img src="{{alert.application.icon}}" alt="alert.application.name">
          </div>
        </div>
    </div>
  `,
  styles: [`
     
    img {
        max-width: 60px
      }
    .alert-container {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      justify-items: center;
      align-items: center;
      grid-gap: 1rem;
    }
    .alert {

    }
    
    
  `]
})
export class EmergencyIconsComponent implements OnInit {

  @Input() alerts: Alert[];

  constructor() { }

  ngOnInit() {
  }


}
