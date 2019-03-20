import { ControlType } from './../models/control-type';
import { Application } from './../models/application';
import { Control, Unit, BodyType } from './../models/catalogs';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Problem } from '../models/problem';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProblemFormService {

  public problem: Problem;

  public applications$: Observable<Application[]>;
  public controls$: Observable<Control[]>;
  public units$: Observable<Unit[]>;
  public bodyTypes$: Observable<BodyType[]>;
  public controlTypes$: Observable<ControlType[]>;
  public user$: Observable<User>;

  constructor(private storageService: StorageService) {
    this.applications$ = this.storageService.getApplications();
    this.controls$ = this.storageService.getControls();
    this.units$ = this.storageService.getUnits();
    this.bodyTypes$ = this.storageService.getBodyTypes();
    this.controlTypes$ = this.storageService.getControlTypes();
    this.user$ = this.storageService.getCurrentUser();
   }


   saveAndSendProblem(problem) {
      this.problem = problem;
      this.storageService.saveProblem(this.problem).subscribe(value => console.log(value));
   }

   saveProblem(problem) {
      this.problem = problem;
   }



}
