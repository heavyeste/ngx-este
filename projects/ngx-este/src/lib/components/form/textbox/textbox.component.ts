import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import 'reflect-metadata';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {
  Observable,
  OperatorFunction,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
} from 'rxjs';

@Component({
  selector: 'nge-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
})
export class NgeFormTextboxComponent implements OnInit {
  @Input()
  Label?: string;

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
  Value: any;
  @Output()
  ValueChange = new EventEmitter<any>();

  @Input()
  ButtonText: string;

  @Output()
  ButtonOnClick = new EventEmitter<any>();

  @Input()
  ClearOnClick: boolean = false;

  constructor() {}
  ngOnInit(): void {}

  /**
   * OnKeyDown
   */
  public OnKeyDown($event: any) {
    if($event.code === 'Enter') {
      this.DoButtonClick();
    }
    console.log($event);
  }

  /**
   * DoButtonClick
   */
  public DoButtonClick() {
    if (this.ButtonOnClick) {
      this.ButtonOnClick.emit();
    }
    if (this.ClearOnClick) this.Value = null;
  }
  /**
   * ExecFunction
   */
  public ExecFunction(type: string) {
    switch (type) {
      case 'ValueChange':
        this.ValueChange.emit(this.Value);
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
