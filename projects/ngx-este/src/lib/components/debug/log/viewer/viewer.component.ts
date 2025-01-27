import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import 'reflect-metadata';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nge-debug-log-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class NgeDebugLogViewerComponent implements OnInit {
  // @Input()
  data: { TimeStamp: Date; Level: 'DEBUG' |'INFO' | 'WARN' | 'ERROR'; Message: string }[] = [];

  constructor() {}
  ngOnInit(): void {}
  /**
   * Add
   */
  public Add(message: string, level: 'DEBUG' |'INFO' | 'WARN' | 'ERROR' = 'DEBUG') {
    this.data.push({
      TimeStamp: new Date(),
      Level: level,
      Message: message,
    });
  }
  public Debug(message: string) {
    this.Add(message, 'DEBUG');
  }
  public Info(message: string) {
    this.Add(message, 'INFO');
  }
  public Warn(message: string) {
    this.Add(message, 'WARN');
  }
  public Error(message: string) {
    this.Add(message, 'ERROR');
  }
}
