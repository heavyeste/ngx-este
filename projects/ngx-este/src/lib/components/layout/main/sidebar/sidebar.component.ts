import { Component, OnInit } from '@angular/core';
import { NgxEsteService, SidebarItem, SidebarSubItem } from 'ngx-este';
@Component({
  selector: 'nge-layout-main-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class LayoutMainSidebarComponent implements OnInit {
  version?: string;
  items: SidebarItem[];
  constructor(service: NgxEsteService) {
    if(service.version)
      this.version = service.version;
    this.items = [];
    if(service.sidebar && service.sidebar.items) {
      service.sidebar.items.forEach((item : SidebarItem) => {
        var newItem = Object.assign(new SidebarItem(), item);
        newItem.items = [];
        if(item && item.items) {
          item.items.forEach((subItem: SidebarSubItem) => {
            var newSubtem = Object.assign(new SidebarSubItem(), subItem);
            if(newItem && newItem.items)
              newItem.items.push(newSubtem);
          });
        }
        this.items.push(newItem);
      });
    }
   }

  ngOnInit() {

  };

}

