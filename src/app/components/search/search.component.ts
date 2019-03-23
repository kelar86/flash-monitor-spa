import { FILTER_ITEM_TYPES } from './../../constants/filter-item-types';
import { MonitorApiService } from './../../services/monitor-api.service';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';



@Component({
  selector: 'app-search',
  template: `

  <ng-template #rt let-r="result" let-t="term" >
     <img [src]="r['icon']" class="mr-2"  alt="image">
     <ngb-highlight [result]="r.name" [term]="t"></ngb-highlight>
   </ng-template>

  <div class="container">

    <input
      aria-label="Search"
      placeholder="Введите приложение, блок управления, агрегат, кузов..."
      type="text"
      class="form-control"
      [(ngModel)]="search_result"
      [ngbTypeahead]="search"
      [inputFormatter]="formatter"
      [resultTemplate]="rt"
      (focus)="focus$.next($event.target.value)"
      (selectItem)="onSelect($event)"
      editable="false"
      #instance="ngbTypeahead"
      />

   </div>

  `,
  styles: [`  
    img {
      width: 20px;
    }
    ::ng-deep .dropdown-menu {
      width: 100%;
    }
   
  `]
})
export class SearchComponent implements OnInit {

  @Input() catalogType: string;
  @Output() valueChange = new EventEmitter();

  search_result;

  constructor(private api: MonitorApiService) { }

  ngOnInit() { }

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  onSelect(ev) {
    this.valueChange.emit(ev.item);
  }

  search = (text$: Observable<string>) => {

  // if input is empty - emit ''
    text$.subscribe(
      value => {
        if (value === '') {
          this.valueChange.emit({type: '', name: '', id: '', icon: ''});
        }
      }
    );

  // advise search stream
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$
      .pipe(
        filter(() => !this.instance.isPopupOpen())
      );

    const inputFocus$ = this.focus$;

    return merge(
      debouncedText$,
      inputFocus$,
      clicksWithClosedPopup$
    )
      .pipe(
        switchMap(term => {
          return this.api.getFilterAdvise(term, this.catalogType);
        }),
      );



  }

  formatter = (x: { name: string, type: string }) => `${x.name} - ${FILTER_ITEM_TYPES[x.type]}`;

}
