import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { NgxEsteComponent } from './ngx-este.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoformNgModelComponent } from './components/autoformmodel/autoformmodel.component';


const exports = [
  NgxEsteComponent, AutoformNgModelComponent
]
@NgModule({
  declarations: [...exports],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [...exports]
})
export class NgxEsteModule { }
