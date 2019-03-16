import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyIconsComponent } from './emergency-icons.component';

describe('EmergencyIconsComponent', () => {
  let component: EmergencyIconsComponent;
  let fixture: ComponentFixture<EmergencyIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
