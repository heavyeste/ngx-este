import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import 'reflect-metadata';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'nge-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class NgeLabelComponent implements OnInit {
  @Input()
  Text?:string;

  @Input()
  Type: 'label' | 'h1' | 'h2' | 'h3' | 'h4' = 'label';
  @Input()
  WithHr?:boolean = false;

  // @Input()
  // Size:string = 'sm'; //'md';

  // @Input()
  // CssClass:string = 'btn-primary';

  constructor() {

  }
  ngOnInit(): void {

  }
}

