import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import 'reflect-metadata';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'nge-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class NgeFormBaseComponent implements OnInit {
  @Input()
  Loading:boolean = false;

  @Input()
  LabelText:string;

  @Input()
  Value:any;
  @Output()
  ValueChange = new EventEmitter<any>();

  @Output()
  OnSelect = new EventEmitter<any>();

  constructor() {

  }
  ngOnInit(): void {

  }
  /**
   * ExecFunction
   */
  public ExecFunction(type: string) {
    switch (type) {
      case 'ValueChange':
        if(this.ValueChange)
          this.ValueChange.emit(this.Value);
        if(this.OnSelect)
          this.OnSelect.emit(this.Value);
        break;
      // case 'focus':
      //   this.Focus.emit();
      //   break;
      // case 'blur':
      //   this.Blur.emit();
      //   break;
    }
  }
}

