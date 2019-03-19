import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationModalComponent } from './authentication-modal.component';

describe('AuthenticationModalComponent', () => {
  let component: AuthenticationModalComponent;
  let fixture: ComponentFixture<AuthenticationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
