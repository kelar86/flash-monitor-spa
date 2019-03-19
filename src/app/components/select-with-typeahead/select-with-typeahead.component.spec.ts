import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWithTypeaheadComponent } from './select-with-typeahead.component';

describe('SelectWithTypeaheadComponent', () => {
  let component: SelectWithTypeaheadComponent;
  let fixture: ComponentFixture<SelectWithTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectWithTypeaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWithTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
