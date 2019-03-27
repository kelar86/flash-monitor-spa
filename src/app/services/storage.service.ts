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

  // public alerts: Observable<AlertList>;
  // public applications$: Observable<Application[]>;
  // public controls$: Observable<Control[]>;
  // public units$: Observable<Unit[]>;
  // public bodyTypes$: Observable<BodyType[]>;
  // public controlTypes$: Observable<ControlType[]>;


  public _alerts$: BehaviorSubject<AlertList> = new BehaviorSubject(new AlertList([]));
  public _user$: BehaviorSubject<User> = new BehaviorSubject(new User());
  public _problem$: BehaviorSubject<Problem> = new BehaviorSubject(new Problem());

  public _applications$: BehaviorSubject<Application[]> = new BehaviorSubject([]);
  public _controlTypes$: BehaviorSubject<ControlType[]> = new BehaviorSubject([]);
  public _controls$: BehaviorSubject<Control[]> = new BehaviorSubject([]);
  public _units$: BehaviorSubject<Unit[]> = new BehaviorSubject([]);
  public _bodyTypes$: BehaviorSubject<BodyType[]> = new BehaviorSubject([]);

  private data: {
    alerts: AlertList,
    user: User,
    problem: Problem,

    applications: Application[],
    controlTypes: ControlType[],
    controls: Control[],
    units: Unit[],
    bodyTypes: BodyType[]
  };


  constructor(private api: MonitorApiService) {

    // this.alerts = this.api.getAlerts('').pipe(map(item => new AlertList(item)));
    // this.applications$ = this.api.getApplications().pipe(map(resp => (<Array<any>>resp).map(item => new Application().deserialize(item))));
    // this.controls$ = this.api.getControls().pipe(map(resp => (<Array<any>>resp).map(item => new Control().deserialize(item))));
    // this.units$ = this.api.getUnits().pipe(map(resp => (<Array<any>>resp).map(item => new Unit().deserialize(item))));
    // this.bodyTypes$ = this.api.getBodyTypes().pipe(map(resp => (<Array<any>>resp).map(item => new BodyType().deserialize(item))));
    // this.controlTypes$ = this.api.getControlTypes().pipe(map(resp => (<Array<any>>resp).map(item => new ControlType().deserialize(item))));

    this.data = {
      alerts: new AlertList([]),
      user: new User(),
      problem: new Problem(),

      applications: [],
      controlTypes: [],
      controls: [],
      units: [],
      bodyTypes: []
    };

    this.loadDataFromApi();

  }

  getApplications() {
    return this._applications$.asObservable();
  }
  getControls() {
    return this._controls$.asObservable();
  }
  getUnits() {
    return this._units$.asObservable();
  }
  getBodyTypes() {
    return this._bodyTypes$.asObservable();
  }
  getControlTypes() {
    return this._controlTypes$.asObservable();
  }

  getCurrentUser() {
    return this._user$.asObservable();
  }

  getUserProblems(user) {
    return this.api.getProblems(user).pipe(map(resp => (<Array<any>>resp).map(item => new Problem().deserialize(item))));
  }

  getTempProblem() {
    return this._problem$.asObservable();
  }

  saveTempProblem(problem) {
    this.data.problem = problem;
    this._problem$.next(problem);
  }

  postProblem(problem) {
    this.data.problem = new Problem();
    this._problem$.next(new Problem());
    return this.api.postProblem(problem);
  }

  loadUser() {
    this.api.getUser().pipe(map(resp => new User().deserialize(resp)))
      .subscribe(v => {
        this.data.user = v;
        this._user$.next(this.data.user);
      });
  }

  loadApplications() {
    this.api.getApplications().pipe(map(resp => (<Array<any>>resp).map(item => new Application().deserialize(item))))
      .subscribe(v => {
        this.data.applications = v;
        this._applications$.next(this.data.applications);
      });
  }

  loadControlTypes() {
    this.api.getControlTypes().pipe(map(resp => (<Array<any>>resp).map(item => new ControlType().deserialize(item))))
      .subscribe(v => {
        this.data.controlTypes = v;
        this._controlTypes$.next(this.data.controlTypes);
      });
  }

  loadControls() {
    this.api.getControls().pipe(map(resp => (<Array<any>>resp).map(item => new Control().deserialize(item))))
      .subscribe(v => {
        this.data.controls = v;
        this._controls$.next(this.data.controls);
      });
  }

  loadUnits() {
    this.api.getUnits().pipe(map(resp => (<Array<any>>resp).map(item => new Unit().deserialize(item))))
      .subscribe(v => {
        this.data.units = v;
        this._units$.next(this.data.units);
      });
  }

  loadBodyTypes() {
    this.api.getBodyTypes().pipe(map(resp => (<Array<any>>resp).map(item => new BodyType().deserialize(item))))
      .subscribe(v => {
        this.data.bodyTypes = v;
        this._bodyTypes$.next(this.data.bodyTypes);
      });
  }

  loadDataFromApi() {
    this.loadUser();
    this.loadApplications();
    this.loadUnits();
    this.loadBodyTypes();
    this.loadControlTypes();
    this.loadControls();
  }


}
