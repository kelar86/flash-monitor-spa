import { MonitorApiService } from './../../services/monitor-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, of, merge } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
  concatMap
} from 'rxjs/operators';



@Component({
  selector: 'app-search',
  template: `

  <ng-template #rt let-r="result" let-t="term">
    <!--  <img [src]="'https://upload.wikimedia.org/wikipedia/commons/thumb/' + r['flag']" class="mr-1" style="width: 16px"> -->
     <ngb-highlight [result]="r.name" [term]="t"></ngb-highlight>
  </ng-template>

  <div class="container">
  <label>Поиск:
    <input 
      type="text" 
      class="form-control" 
      [(ngModel)]="search_result" 
      [ngbTypeahead]="search"
      [inputFormatter]="formatter"
      [resultTemplate]="rt" 
      (focus)="focus$.next($event.target.value)"
      (click)="click$.next($event.target.value)"
      (selectItem)="onSelect()"
      #instance="ngbTypeahead"/>
  </label>
   </div>

   {{instance.isPopupOpen()}}
  
   {{search_result | json}}
   <pre>{{problems | json}}</pre>
   
  `,
  styles: []
})
export class SearchComponent implements OnInit {

  problems;

  private search_result;

  constructor(private api: MonitorApiService) { }

  ngOnInit() {
    this.api.getProblems().subscribe(value => this.problems = value);
  }

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  select$ = new Subject<string>();

  onSelect() {
    this.instance.dismissPopup();
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$
      .pipe(
        filter(() => !this.instance.isPopupOpen()),
      );

    const inputFocus$ = this.focus$;

    return merge(
      debouncedText$,
      inputFocus$,
      clicksWithClosedPopup$
    )
      .pipe(
        // filter(v => v === ''),

        concatMap(term => {
          // console.log('switchMap');
          return this.api.search(term)
        }),
      );

  }

  formatter = (x: { name: string }) => x.name;

}
