import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxEsteService {
  title?:string = 'NgxEste';
  sidebar?: Sidebar;
  constructor() { }
}

export class Sidebar {
  items?: SidebarItem[];
}
export class SidebarItem {
  title?:string;
  items?: SidebarSubItem[];
}
export class SidebarSubItem {
  constructor() {
    this.icon = 'fa-solid fa-circle';
  }
  title?:string;
  link?:string;
  icon?:string = 'fa-solid fa-circle';
}
