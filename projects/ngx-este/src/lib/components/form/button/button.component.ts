import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import 'reflect-metadata';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'nge-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class NgeFormButtonComponent implements OnInit {

  @Output()
  OnClick = new EventEmitter<any>();

  @Input()
  Label?:string;

  @Input()
  IconSet:string = 'regular';
  @Input()
  Icon?:string;

  @Input()
  Size:string = 'sm'; //'md';

  @Input()
  CssClass:string = 'btn-primary';

  @Input()
  CssClassExtra:string = '';

  @Input()
  data:any;

  constructor() {

  }
  ngOnInit(): void {

  }
  /**
   * OnClickAction
   */
  public OnClickAction() {
    this.OnClick.emit(this.data);
  }
}

