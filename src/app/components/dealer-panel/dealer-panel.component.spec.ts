import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerPanelComponent } from './dealer-panel.component';

describe('DealerPanelComponent', () => {
  let component: DealerPanelComponent;
  let fixture: ComponentFixture<DealerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DealerPanelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
