import { ControlType } from './../../models/control-type';
import { Application } from './../../models/application';
import { Control, Unit, BodyType } from './../../models/catalogs';
import { ProblemFormService } from './../../services/problem-form.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.css']
})
export class ProblemFormComponent implements OnInit {

  public problemForm: FormGroup;

  private applications: Application[];
  private controls: Control[];
  private units: Unit[];
  private bodyTypes: BodyType[];
  private controlTypes: ControlType[];

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


    const defaultDate = {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate()
    };

    this.problemForm = new FormGroup({
      detection_date: new FormControl(defaultDate),
      application: new FormControl(''),
      control_type: new FormControl(''),
      control: new FormControl(''),
      unit: new FormControl(''),
      body_type: new FormControl(''),
      description: new FormControl('')
    });
  }

}
