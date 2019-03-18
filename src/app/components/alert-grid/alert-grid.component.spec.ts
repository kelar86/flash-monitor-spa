import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertGridComponent } from './alert-grid.component';
import { Alert } from 'src/app/models/alert';


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

  it('shuld show no-alerts message if no alerts', () => {
    component.alerts = [];
    fixture.detectChanges();

    const ngbAlert = fixture.nativeElement.querySelector('ngb-alert');
    expect(ngbAlert).toBeTruthy();
  });

  it('shuld show no-alerts message if no alerts', () => {
    component.alerts = [
      new Alert().deserialize({
        "id": 10,
        "application": {
            "id": 6,
            "name": "Xentry TIPS",
            "icon": "http://localhost:8000/media/xentry_4Lpq00z.png",
            "has_controls": true
        },
        "alert_type": "ACTIVE",
        "start_date": "2019-03-14T10:50:43Z",
        "finish_date": "2019-03-27T09:11:24Z",
        "category": "APPLICATION_ALERT",
        "control": [],
        "unit": [],
        "body_type": [],
        "description": "Это довольно короткое описание проблемы.",
        "author": {
            "username": "D1",
            "first_name": "",
            "last_name": "",
            "email": ""
        },
        "is_planed": false,
        "is_expiered": false
    }),
      new Alert().deserialize({
        "id": 11,
        "application": {
            "id": 3,
            "name": "VeDoc",
            "icon": "http://localhost:8000/media/vedoc_8X2jSIl.png",
            "has_controls": false
        },
        "alert_type": "ACTIVE",
        "start_date": "2019-03-15T16:39:26Z",
        "finish_date": null,
        "category": "CONTROL_ALERT",
        "control": [
            {
                "id": 1,
                "name": "w204 om646",
                "icon": "http://localhost:8000/media/eng_bfwLPyL.png"
            }
        ],
        "unit": [
            {
                "id": 2,
                "name": "Агрегат2",
                "icon": null
            }
        ],
        "body_type": [
            {
                "id": 1,
                "name": "Седан",
                "icon": null
            }
        ],
        "description": "Проблема",
        "author": {
            "username": "D1",
            "first_name": "",
            "last_name": "",
            "email": ""
        },
        "is_planed": false,
        "is_expiered": false
    })
    ];

    fixture.detectChanges();

    const tbody = fixture.nativeElement.querySelector('tbody');
    expect(tbody).toBeTruthy();
  });


});
