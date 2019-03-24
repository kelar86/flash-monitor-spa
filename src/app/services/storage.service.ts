import { AlertList } from './../models/alert';
import { Application } from './../models/application';
import { MonitorApiService } from './monitor-api.service';
import { ControlType } from './../models/control-type';
import { Control, Unit, BodyType } from './../models/catalogs';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Problem } from '../models/problem';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public alerts: Observable<AlertList>;
  public applications$: Observable<Application[]>;
  public controls$: Observable<Control[]>;
  public units$: Observable<Unit[]>;
  public bodyTypes$: Observable<BodyType[]>;
  public controlTypes$: Observable<ControlType[]>;

  public userProblems$: Observable<Problem[]>;

  public _user$: BehaviorSubject<User> = new BehaviorSubject(new User());
  public _problem$: BehaviorSubject<Problem> = new BehaviorSubject(new Problem());


  private dataStore: {
    user: User,
    problem: Problem
  };

  constructor(private api: MonitorApiService) {

    this.alerts = this.api.getAlerts('').pipe(map(item => new AlertList(item)));
    this.applications$ = this.api.getApplications().pipe(map(resp => (<Array<any>>resp).map(item => new Application().deserialize(item))));
    this.controls$ = this.api.getControls().pipe(map(resp => (<Array<any>>resp).map(item => new Control().deserialize(item))));
    this.units$ = this.api.getUnits().pipe(map(resp => (<Array<any>>resp).map(item => new Unit().deserialize(item))));
    this.bodyTypes$ = this.api.getBodyTypes().pipe(map(resp => (<Array<any>>resp).map(item => new BodyType().deserialize(item))));
    this.controlTypes$ = this.api.getControlTypes().pipe(map(resp => (<Array<any>>resp).map(item => new ControlType().deserialize(item))));

    this.dataStore = {
      user: new User(),
      problem: new Problem()
    };
    
    this.setCurrentUser();

  }

  getApplications() {
    return this.applications$;
  }
  getControls() {
    return this.controls$;
  }
  getUnits() {
    return this.units$;
  }
  getBodyTypes() {
    return this.bodyTypes$;
  }
  getControlTypes() {
    return this.controlTypes$;
  }

  getCurrentUser() {
    return this._user$.asObservable();
  }

  setCurrentUser() {
    this.api.getUser().pipe(map(resp => new User().deserialize(resp)))
      .subscribe(v => {
        this.dataStore.user = v;
        this._user$.next(this.dataStore.user); 
      });
  }

  getUserProblems(user) {
    return this.api.getProblems(user).pipe(map(resp => (<Array<any>>resp).map(item => new Problem().deserialize(item))));
  }

  getTempProblem() {
    return this._problem$.asObservable();
  }

  saveTempProblem(problem) {
    this.dataStore.problem = problem;
    this._problem$.next(problem);
  }

  postProblem(problem) {
    return this.api.postProblem(problem);
  }

}
