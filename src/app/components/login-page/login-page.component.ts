import { Component, OnInit } from '@angular/core';
import { AuthenticationModalComponent } from '../authentication-modal/authentication-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  template: `


  <!--
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
        <label for="username">Имя пользователя:</label>
        <input type="text" formControlName="username" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.username.errors }" />
        <div *ngIf="submitted && f.username.errors" class="invalid-feedback">
            <div *ngIf="f.username.errors.required">Обязательное поле</div>
        </div>
    </div>
    <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" formControlName="password" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.password.errors }" />
        <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
            <div *ngIf="f.password.errors.required">Обязательное поле</div>
        </div>
    </div>
    <div class="form-group">
        <button [disabled]="loading" class="btn btn-primary">Войти</button>
    </div>
    <div *ngIf="error" class="alert alert-danger">{{error}}</div>
  </form>
  -->
  `,
  styles: []
})
export class LoginPageComponent implements OnInit {

    constructor(private modalService: NgbModal) {}

    ngOnInit() {
      this.modalService.open(AuthenticationModalComponent, {backdrop: 'static', keyboard: false});

    }
}
