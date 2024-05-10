import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import 'reflect-metadata';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable,  OperatorFunction,  Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';
import { NgeFormBaseComponent } from '../base/base.component';


@Component({
  selector: 'nge-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class NgeFormSelectComponent extends NgeFormBaseComponent implements OnInit {
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

  override ngOnInit(): void {
  }
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

