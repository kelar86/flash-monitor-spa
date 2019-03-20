import { Catalog } from './../../models/catalogs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
        <div class="col-1">
        <p><a [routerLink]="['/login']">Выход</a></p>
        </div>
       </div>
       <div class="row mt-2">
            <nav class="col-2">
              <button class="btn btn-dark" (click)="open()"> + Проблема </button>
            </nav>
            <nav class="col-3">
              <button *ngIf="" type="button" class="btn btn-link">Статусы проблем</button>
            </nav>
            <div class="col-7">
              <app-search (valueChange)="getFilterOption($event)" [catalogType]="catalog.type()"></app-search>
            </div>
        </div>
      </div>
    </header>
  `,
  styleUrls: [`./header-container.component.css`]
})
export class HeaderContainerComponent implements OnInit {

  @Input() catalog: Catalog;
  @Output() filterChange = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  getFilterOption($event) {
    this.filterChange.emit($event);
  }

  open() {
    const modalReference = this.modalService.open(ProblemFormComponent);

    modalReference.result.then((result) => {
      console.log(result);
      modalReference.close();
    }, (reason) => {
      console.log(reason);
      modalReference.close()
    });
  }
}
