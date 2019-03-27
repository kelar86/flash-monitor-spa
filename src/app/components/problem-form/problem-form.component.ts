import { Application } from './../../models/application';
import { StorageService } from './../../services/storage.service';
import { NgbDateCustomParserFormatter } from './../../shared/ngb-date-custom-formatter';
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

  error;

  private problem: Problem;

  detection_date;
  application: Application;
  control_type;
  control = [];
  unit = [];
  body_type = [];
  description;

  applications;

  private user;

  private today = new Date;

  private subscribtions;

  constructor(
    public activeModal: NgbActiveModal,
    public storage: StorageService
  ) {

    this.storage.getApplications().subscribe( v => this.applications = v);
   }

  ngOnInit() {

    this.subscribtions = [
        this.storage.getCurrentUser().subscribe(v => this.user = v),

        // Try to match problem from the state
        this.storage.getTempProblem().subscribe(v => {
          console.log(v.application);
          this.problem = v;
          this.detection_date = v.detection_date;
          this.application = v.application ? v.application : this.applications[0];
          this.control_type = '';
          this.control = v.control ? v.control : [];
          this.unit = v.unit ? v.unit : [];
          this.body_type = v.body_type ? v.body_type : [];
          this.description = v.description;
        })
    ];
    this.detection_date = this.detection_date ? this.detection_date : {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate()
    };

  }


  hasControl() {
    if (this.application) {
      return this.application.has_controls;
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
    this.storage.postProblem(this.problem)
    .subscribe(
      result => this.activeModal.close(result),
      error => this.error = error.error);
  }

  cancelForm() {
    this.deserializeForm();
    this.storage.saveTempProblem(this.problem);
    this.activeModal.dismiss(this.problem);
  }

  ngOnDestroy() {
    this.subscribtions.map(subscribtion => subscribtion.unsubscribe());
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
