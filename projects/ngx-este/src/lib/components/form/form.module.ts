import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgeFormButtonComponent } from './button/button.component';
import { NgeFormTypeaheadComponent } from './typeahead/typeahead.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgeFormTextboxComponent } from './textbox/textbox.component';
import { NgeFormSelectComponent } from './select/select.component';
import { NgeSharedModule } from '../@shared/shared.module';

const exportsComponents = [
  NgeFormButtonComponent, NgeFormTypeaheadComponent, NgeFormTextboxComponent, NgeFormSelectComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FormsModule,
    NgbTypeaheadModule,
    NgeSharedModule,
  ],
  declarations: [...exportsComponents],
  exports: [...exportsComponents]
})
export class NgeFormModule { }
