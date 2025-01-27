/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'ngx-este';
import { LayoutMainComponent } from 'ngx-este';
import { TestTest01Component } from './test01/test01.component';

const routes: Routes = [
  {
    path: 'test',
    component: LayoutMainComponent,
    children: [
      { path: '', component: TestTest01Component },
      { path: 'test01', component: TestTest01Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LayoutModule],
  exports: [RouterModule],
})
export class TestRoutingModule {}
