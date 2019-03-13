import { MonitorApiService } from './../../services/monitor-api.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { NgbTypeahead, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';



@Component({
  selector: 'app-search',
  template: `

  <ng-template #rt let-r="result" let-t="term">
     <img [src]="r['icon']" class="mr-2"  alt="иконка">
     <ngb-highlight [result]="r.name" [term]="t"></ngb-highlight>
  </ng-template>

  <div class="container">
  
    <input 
      aria-label="Поиск"
      placeholder="Введите приложение, блок управления, агрегат, кузов..."
      type="text" 
      class="form-control" 
      [(ngModel)]="search_result" 
      [ngbTypeahead]="search"
      [inputFormatter]="formatter"
      [resultTemplate]="rt" 
      (focus)="focus$.next($event.target.value)"
      (selectItem)="onSelect($event)"
      #instance="ngbTypeahead"/>

   </div>
   
  `,
  styles: [`
    img {
      width: 20px
    }
    input {
      width: 100%
      margin: 20px;
    }
  `]
})
export class SearchComponent implements OnInit {

  @Output() valueChange = new EventEmitter();

  private search_result;

  constructor(private api: MonitorApiService) { }

  ngOnInit() { }

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  onSelect(ev) {
    this.valueChange.emit(ev.item);
  }

  search = (text$: Observable<string>) => {
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
          return this.api.search(term);
        }),
      );


  }

  formatter = (x: { name: string, type: string }) => `${x.name} - ${x.type}`;

}
