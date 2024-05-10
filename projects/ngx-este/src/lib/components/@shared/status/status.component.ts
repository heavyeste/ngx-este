import { Component, Input, OnInit, inject } from '@angular/core';
import { AppConfigService } from 'ngx-este';
import { NgeDurationPipe } from '../../../pipes/duration.pipe';

@Component({
  selector: 'nge-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class NgeStatusComponent implements OnInit {

  @Input()
  status: number = 0;

  @Input()
  iconPrefix: string = 'fa';

  @Input()
  icon: string = '';

  @Input()
  cssClass: string;

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  /**
   * GetClass
   */
  public GetClass() {
    let res = `${this.iconPrefix} ${this.icon}`;
    if(this.cssClass)
      res += ` ${this.cssClass}`;
    return res;
  }
}
