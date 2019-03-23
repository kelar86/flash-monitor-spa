import { Component, OnInit } from '@angular/core';
import { AuthenticationModalComponent } from '../authentication-modal/authentication-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login-page',
  template: `<app-dashboard></app-dashboard> `,
  styles: []
})
export class LoginPageComponent implements OnInit {

    constructor(private modalService: NgbModal) {}

    ngOnInit() {
      this.modalService.open(AuthenticationModalComponent, {backdrop: 'static', keyboard: false});

    }
}
