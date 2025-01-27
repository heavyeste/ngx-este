import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {  TestRoutingModule } from './test-routing.module';
import { NgxEsteModule } from 'ngx-este';
import { HttpClientModule } from '@angular/common/http';
import { TestTest01Component } from './test01/test01.component';

@NgModule({
  declarations: [TestTest01Component],
  imports: [
    BrowserModule,
    TestRoutingModule,
    HttpClientModule,
    NgxEsteModule,
  ],
  providers: [],
  // bootstrap: [AppComponent],
})
export class TestModule {}
