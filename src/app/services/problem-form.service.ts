import { ControlType } from './../models/control-type';
import { Application } from './../models/application';
import { Control, Unit, BodyType } from './../models/catalogs';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemFormService {

  public applications$: Observable<Application[]>;
  public controls$: Observable<Control[]>;
  public units$: Observable<Unit[]>;
  public bodyTypes$: Observable<BodyType[]>;
  public controlTypes$: Observable<ControlType[]>;

  constructor(private storageService: StorageService) {
    this.applications$ = this.storageService.getApplications();
    this.controls$ = this.storageService.getControls();
    this.units$ = this.storageService.getUnits();
    this.bodyTypes$ = this.storageService.getBodyTypes();
    this.controlTypes$ = this.storageService.getControlTypes();


    

   }



   
}
