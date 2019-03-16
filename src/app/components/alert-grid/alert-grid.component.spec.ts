import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertGridComponent } from './alert-grid.component';

describe('AlertGridComponent', () => {
  let component: AlertGridComponent;
  let fixture: ComponentFixture<AlertGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
