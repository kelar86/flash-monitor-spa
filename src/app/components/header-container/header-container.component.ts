import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProblemFormComponent } from '../problem-form/problem-form.component';

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
              <button class="btn btn-dark" (click)="open()"> + Проблема </button>
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

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  getFilterOption($event) {
    console.log($event);
  }

  open() {
    this.modalService.open(ProblemFormComponent);

  }
}
