import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgeDebugLogViewerComponent } from './log/viewer/viewer.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgeSharedModule } from '../@shared/shared.module';

const exportsComponents = [
  NgeDebugLogViewerComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FormsModule,
    // NgbTypeaheadModule,
    NgeSharedModule,
  ],
  declarations: [...exportsComponents],
  exports: [...exportsComponents]
})
export class NgeDebugModule { }
