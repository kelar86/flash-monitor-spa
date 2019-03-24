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
      <img [src]="r['icon']" class="mr-2"  alt="image" style="width: 16px">
      <ngb-highlight [result]="r.name" [term]="t"></ngb-highlight>
    </ng-template>

   
    <div class="form-control typehead" >
      <input
        #input
        #instance="ngbTypeahead"
        id="typeahead-basic"
        type="text"
        class="typehead__input"
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

      <span class="selected-item" *ngFor="let item of selectedItems">{{ item.name }} {{item.type_name}} <span type="button" (click)="removeItem(item.id)">[X]</span></span>
    </div>
    <div>
      
    </div>

  `,
  styles: [`
   ::ng-deep .dropdown-menu {
      width: 300px;
    }

    .selected-item {
      margin: 0.5em;
    }
    .typehead {
      height:80px
    }
    .typehead__input {
      display: block;
      width: 100%;
      border:none; 
      background: transparent; 
      outline: 0;
    }
    `]
})
export class SelectWithTypeaheadComponent implements OnInit, ControlValueAccessor {

  @Input() isMultiple;
  @Input() searchList;
  @Input() placeholder;

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
    this.writeValue(this.selectedItems);
  }

  onSelect($event, input) {
    $event.preventDefault();
    if (!this.selectedItems.includes(($event.item))){
      this.selectedItems.push($event.item)
    }

    if (!this.isMultiple) {
      this.selectedItems = [$event.item];
    }

    if ( this.isMultiple && $event.item.name === 'Выбрать все') {
      this.selectedItems = this.searchList;
    }

    this.writeValue(this.selectedItems);
  }


  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? 
        (this.isMultiple ? [{ name: 'Выбрать все', icon: '' } , ...this.searchList] : this.searchList)
        : this.searchList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  formatter = (x: { name: string }) => x.name;


  writeValue(value: any) {
    if (value !== undefined) {
      this.selectedItems = value;
    }    
    this.onChange(this.selectedItems);
  }

  onChange = (_: any) => { };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() { }
  
}
