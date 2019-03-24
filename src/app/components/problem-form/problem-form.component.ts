import { StorageService } from './../../services/storage.service';
import { NgbDateCustomParserFormatter } from './../../shared/ngb-date-custom-formatter';
import { ControlType } from './../../models/control-type';
import { Application } from './../../models/application';
import { Control, Unit, BodyType } from './../../models/catalogs';
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

  private loading = false;
  private submitted = false;

  private problem: Problem;

  private applications: Application[];
  private controls: Control[];
  private units: Unit[];
  private bodyTypes: BodyType[];
  private controlTypes: ControlType[];

  private detection_date;
  private application = [];
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
    private storage: StorageService
  ) { }

  ngOnInit() {

    this.subscribtions = [
        this.storage.getApplications().subscribe(v => this.applications = v),
        this.storage.getControls().subscribe(v => this.controls = v),
        this.storage.getUnits().subscribe(v => this.units = v),
        this.storage.getBodyTypes().subscribe(v => this.bodyTypes = v),
        this.storage.getControlTypes().subscribe(v => this.controlTypes = v),
        this.storage.getCurrentUser().subscribe(v => this.user = v),
        this.storage.getTempProblem().subscribe(v => this.problem = v)
        
    ];
    this.detection_date = {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate()
    };

  }


  hasControl() {
    if (this.application[0]) {
      return this.application[0].has_controls;
    }
    return true;
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
  }

  saveForm() {
    this.deserializeForm();
    this.activeModal.close(this.problem);
  }

  cancelForm() {
    this.deserializeForm();
    this.activeModal.dismiss(this.problem);
  }

  ngOnDestroy() {
    this.subscribtions.map(subscribtion => subscribtion.unsubscribe());
  }

}
