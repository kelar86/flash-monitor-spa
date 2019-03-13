import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-container',
  template: `
    <header>
      <div class="container header">
       <div class="row">
        <div class="col">
          ЛОГОТИП
        </div>
        <div class="col">
          <h4>Flash Monitor</h4>
        </div>

        <div class="col">
          <app-clock></app-clock>
        </div>
       </div>
       <div class="row"> 
            <nav class="col-4">
              <button class="btn btn-dark"> + Проблема </button>
            </nav>
            <div class="col-8">
              <app-search (valueChange)='getFilterOption($event)'></app-search>
            </div>
        </div>
        
     
      </div>  
    </header>
  `,
  styleUrls: [`./header-container.component.css`]
})
export class HeaderContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getFilterOption($event) {
    console.log($event);
  }
}
