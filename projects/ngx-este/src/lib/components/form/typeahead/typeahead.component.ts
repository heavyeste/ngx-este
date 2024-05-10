import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import 'reflect-metadata';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable,  OperatorFunction,  Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';
import { NgeBaseComponent } from 'ngx-este';
import { NgeFormBaseComponent } from '../base/base.component';


@Component({
  selector: 'nge-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class NgeFormTypeaheadComponent extends NgeFormBaseComponent implements OnInit {
  // @Input()
  // Label?:string;

  // @Input()
  // IconSet:string = 'regular';
  // @Input()
  // Icon?:string;

  // @Input()
  // Size:string = 'sm'; //'md';

  // @Input()
  // CssClass:string = 'btn-primary';

  // @Input()
  // CssClassExtra:string = '';

  @Input()
  ValueList: string[] = [];

  @Input()
  ButtonText:string;


  @Output()
  ButtonOnClick = new EventEmitter<any>();

  @ViewChild('instance', { static: true }) instance?: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  override ngOnInit(): void {
  }

  /**
   * search
   */
  search: OperatorFunction<string, readonly any[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());

    var clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => {
        if (this.instance) return !this.instance.isPopupOpen();
        else return false;
      })
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ''
          ? this.ValueList
          : this.ValueList.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
        ).slice(0, 10)
      )
    );

    // else
    //   return null;
  };

  /**
   * DoButtonClick
   */
  public DoButtonClick() {
    if(this.ButtonOnClick) {
      this.ButtonOnClick.emit();
    }
    this.Value = null;
  }
}

