import { map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subject, Observable, merge } from 'rxjs';

import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef, Output, EventEmitter } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const noop = () => { };

@Component({
  selector: 'app-select-with-typeahead',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectWithTypeaheadComponent),
      multi: true,
    }
  ],
  template: `
  
    <ng-template #rt let-r="result" let-t="term">
    <!--  <img [src]="'https://upload.wikimedia.org/wikipedia/commons/thumb/' + r['flag']" class="mr-1" style="width: 16px"> -->
      <ngb-highlight [result]="r.name" [term]="t"></ngb-highlight>
    </ng-template>

    <div>  
      <input 
        #input
        #instance="ngbTypeahead"
        id="typeahead-basic" 
        type="text" 
        class="form-control" 
        [(ngModel)]="model" 
        [ngbTypeahead]="search"
        [resultTemplate]="rt"
        [inputFormatter]="formatter"
        (focus)="focus$.next($event.target.value)"
        (click)="click$.next($event.target.value)"
        (selectItem)="onSelect($event, input)"
        editable="false"
        placeholder="Добавить"
        />
    </div>
    <div> 
      <p *ngFor="let item of selectedItems">{{ item.name }} {{item.type_name}} <span type="button" (click)="removeItem(item.id)">[X]</span></p>
    </div> 
  
  `,
  styles: []
})
export class SelectWithTypeaheadComponent implements OnInit {

  @Input() isMultiple;
  @Input() searchList;
  @Input() placeholder;
  @Output() valueChange = new EventEmitter;

  private model;
  private selectedItems = [];

  constructor() { }

  @ViewChild('instance') instance: NgbTypeahead;
  @ViewChild('input') input: ElementRef;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  ngOnInit() {
  }

  removeItem(id) {
    this.selectedItems = this.selectedItems.filter( item => item.id !== id);
    this.valueChange.emit(this.selectedItems);
  }

  
  onSelect($event, input) {
    $event.preventDefault();
    if (!this.selectedItems.includes(($event.item))){ 
      this.selectedItems.push($event.item)
    }

    if (!this.isMultiple) {
      this.selectedItems = [$event.item];
    }
    
    this.valueChange.emit(this.selectedItems);
    input.value = '';   
  }


  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.searchList
        : this.searchList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  formatter = (x: { name: string }) => x.name;

}
