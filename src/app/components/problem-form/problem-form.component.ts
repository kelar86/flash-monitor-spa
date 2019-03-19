import { ControlType } from './../../models/control-type';
import { Application } from './../../models/application';
import { Control, Unit, BodyType } from './../../models/catalogs';
import { ProblemFormService } from './../../services/problem-form.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.css']
})
export class ProblemFormComponent implements OnInit {

  private applications: Application[];
  private controls: Control[];
  private units: Unit[];
  private bodyTypes: BodyType[];
  private controlTypes: ControlType[];

  private detection_date;
  private application;
  private control_type;
  private control = [];
  private unit = [];
  private body_type = [];
  private description;  

  private today = new Date;

  constructor(
    public activeModal: NgbActiveModal, 
    private problemFormService: ProblemFormService
  ) { }

  ngOnInit() {

    this.problemFormService.applications$.subscribe(v => this.applications = v);
    this.problemFormService.controls$.subscribe(v => this.controls = v);
    this.problemFormService.units$.subscribe(v => this.units = v);
    this.problemFormService.bodyTypes$.subscribe(v => this.bodyTypes = v);
    this.problemFormService.controlTypes$.subscribe(v => this.controlTypes = v);

    this.detection_date = {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate()
    };


  }

  setCatalogAttribute(data, attribute) {
    this['attribute'] = data.map(item => item.id);
  }

  setApplication(data) {
    console.log(data[0]);
    this.application = data[0];
  }
 
  hasControl(){
    if (this.application){
      return this.application.has_controls;
    }
    return true;
  }

}
