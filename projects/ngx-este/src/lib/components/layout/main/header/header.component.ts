import { Component, OnInit } from '@angular/core';
import { NgxEsteService } from 'ngx-este';

@Component({
  selector: 'nge-layout-main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class LayoutMainHeaderComponent implements OnInit {
  title: string;
  constructor(service: NgxEsteService) {
    var s = new NgxEsteService();
    if(service.title)
      this.title = service.title;
    else
      this.title = s.title;
  }

  ngOnInit() {
  }

}
