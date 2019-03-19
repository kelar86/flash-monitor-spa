import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-authentication-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Вход в систему</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">

    <form>
      <div class="form-group">
        <label for="login">Имя пользователя:</label>
          <input type="text" class="form-control" id="login"  aria-describedby="userLogin" placeholder="Имя пользователя">  
      </div>
      
      <div class="form-group">
        <label for="password" >Пароль:</label>
          <input type="password" class="form-control"  id="password" placeholder="Пароль">
      </div>
     
      <button type="submit" class="btn btn-primary">Войти</button>
    </form>
      
  </div>
   
  `,
  styles: []
})
export class AuthenticationModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
