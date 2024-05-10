import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import 'reflect-metadata';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'nge-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class NgeLoadingComponent implements OnInit {
  @Input()
  Label?:string;

  @Input()
  IconSet:string = 'regular';
  @Input()
  Icon?:string = 'font';

  @Input()
  Size:string = 'sm'; //'md';

  @Input()
  CssClass:string = 'btn-primary';

  constructor() {

  }
  ngOnInit(): void {

  }
}

