import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutMainComponent } from './main/main.component';
import { LayoutMainHeaderComponent } from './main/header/header.component';
import { RouterModule } from '@angular/router';
import { LayoutMainSidebarComponent } from './main/sidebar/sidebar.component';

const exportsComponents = [
  LayoutMainComponent, LayoutMainHeaderComponent, LayoutMainSidebarComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  declarations: [...exportsComponents],
  exports: [...exportsComponents]
})
export class LayoutModule { }
