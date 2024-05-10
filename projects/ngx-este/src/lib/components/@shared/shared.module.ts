import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgeIconComponent } from './icon/icon.component';
import { NgeLoadingComponent } from './loading/loading.component';
import { NgeLabelComponent } from './label/label.component';
import { NgeStatusComponent } from './status/status.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


const exportsComponents = [
  NgeIconComponent, NgeLoadingComponent, NgeLabelComponent, NgeStatusComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FormsModule,
    NgbTypeaheadModule
  ],
  declarations: [...exportsComponents],
  exports: [...exportsComponents]
})
export class NgeSharedModule { }
