import { Component, OnInit } from '@angular/core';
import { NgxEsteService, SidebarItem, SidebarSubItem } from 'ngx-este';
@Component({
  selector: 'nge-layout-main-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class LayoutMainSidebarComponent implements OnInit {
  items: SidebarItem[];
  constructor(service: NgxEsteService) {
    this.items = [];
    service.sidebar.items.forEach((item : SidebarItem) => {
      var newItem = Object.assign(new SidebarItem(), item);
      newItem.items = [];
      item.items.forEach((subItem: SidebarSubItem) => {
        var newSubtem = Object.assign(new SidebarSubItem(), subItem);
        newItem.items.push(newSubtem);
      });
      this.items.push(newItem);
    });
   }

  ngOnInit() {

  };

}

