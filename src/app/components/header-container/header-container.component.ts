import { Catalog } from './../../models/catalogs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProblemFormComponent } from '../problem-form/problem-form.component';
import { Problem } from 'src/app/models/problem';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header-container',
  template: `
    <div class="container-fluid header">  
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
        <div class="col d-none d-md-block">
         <span >Пользователь: {{user.username}}</span>
         <span class="float-right"> <a [routerLink]="['/login']">Выход</a></span>
        </div>
       </div>
       <div class="row menu-row">
            <nav class="col-2 ">
              <button class="btn btn-dark" (click)="open()"> + Проблема </button>
            </nav>
            <nav class="col-3">
              <button *ngIf="problems" type="button" class="btn btn-link">Статусы проблем</button>
            </nav>
            <div class="col-7">
              <app-search (valueChange)="getFilterOption($event)" [catalogType]="catalog.type()"></app-search>
            </div>
        </div>
    </div>
  `,
  styleUrls: [`./header-container.component.css`]
})
export class HeaderContainerComponent implements OnInit {

  @Input() user: User;
  @Input() catalog: Catalog;
  @Input() problems: Problem[];
  @Output() filterChange = new EventEmitter();


  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  getFilterOption($event) {
    this.filterChange.emit($event);
  }

  open() {
    const modalReference = this.modalService.open(ProblemFormComponent, { backdrop: 'static', keyboard: false, size: 'lg'});

    modalReference.result.then((result) => {

      console.log(result);
      // result.subscribe(value => console.log(value))

      modalReference.close();
    }, (reason) => {
      console.log(reason);
      modalReference.close()
    });
  }
}
