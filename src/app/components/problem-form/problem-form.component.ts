import { StorageService } from './../../services/storage.service';
import { NgbDateCustomParserFormatter } from './../../shared/ngb-date-custom-formatter';
import { ControlType } from './../../models/control-type';
import { Application } from './../../models/application';
import { Control, Unit, BodyType } from './../../models/catalogs';
import { ProblemFormService } from './../../services/problem-form.service';
import { NgbActiveModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Problem } from 'src/app/models/problem';



@Component({
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }],
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.css']
})
export class ProblemFormComponent implements OnInit, OnDestroy {

  private problem: Problem;

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

  private user;

  private today = new Date;

  private subscribtions;

  constructor(
    public activeModal: NgbActiveModal,
    private problemFormService: ProblemFormService,
    private storage: StorageService
  ) { }

  ngOnInit() {

    this.subscribtions = [
        this.problemFormService.applications$.subscribe(v => this.applications = v),
        this.problemFormService.controls$.subscribe(v => this.controls = v),
        this.problemFormService.units$.subscribe(v => this.units = v),
        this.problemFormService.bodyTypes$.subscribe(v => this.bodyTypes = v),
        this.problemFormService.controlTypes$.subscribe(v => this.controlTypes = v),
        this.storage.getCurrentUser().subscribe(v => {
          
          this.user = v;
          console.log(this.user);
        }),
    ];
    this.detection_date = {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate()
    };

  }

  setCatalogAttribute(data, attribute) {
    this[attribute] = data.map(item => item);
    console.log(data);
  }

  setApplication(data) {
    console.log(data[0]);
    this.application = data[0];
  }

  hasControl() {
    if (this.application) {
      return this.application.has_controls;
    }
    return true;
  }

  saveAndSendForm() {
    this.deserializeForm();
    this.problemFormService.saveAndSendProblem(this.problem);
  }

  saveTempForm() {
    this.deserializeForm();
    this.problemFormService.saveProblem(this.problem);
  }

  deserializeForm() {
    this.problem = new Problem().deserialize({
      application: this.application,
      detection_date: this.detection_date,
      control_type: this.control_type,
      control: this.control,
      unit: this.unit,
      body_type: this.body_type,
      description: this.description,
      author: this.user
    });

    console.log( this.problem);
  }

  ngOnDestroy() {
    this.subscribtions.map(subscribtion => subscribtion.unsubscribe());
  }

}
