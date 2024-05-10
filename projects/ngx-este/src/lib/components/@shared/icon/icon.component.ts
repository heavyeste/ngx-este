import { Component, Input, OnInit, inject } from '@angular/core';
import { AppConfigService } from 'ngx-este';
import { NgeDurationPipe } from '../../../pipes/duration.pipe';

@Component({
  selector: 'nge-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class NgeIconComponent implements OnInit {

  @Input()
  iconPrefix: string = 'fa';

  @Input()
  icon: string = '';

  @Input()
  cssClass: string;

  @Input()
  animation: 'spin';

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
    if(this.animation) {
      // https://docs.fontawesome.com/web/style/animate
      switch(this.animation) {
        case 'spin':
          res += ` fa-spin`;
          break;
      }
    }
    return res;
  }
}
