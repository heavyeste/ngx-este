import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxEsteComponent } from './ngx-este.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { BrowserModule } from '@angular/platform-browser';
import { NgeDurationPipe, NgxEsteService } from 'ngx-este';
import { AutoformComponent } from './components/autoform/autoform.component';
import { AutoformNgModelComponent } from './components/autoformmodel/autoformmodel.component';
import { AutomodalComponent } from './components/automodal/automodal.component';
import { AutotableComponent } from './components/autotable/autotable.component';
import { AutoTableColumnCellDirective } from './components/autotable/column/autotable-column-cell.directive';
import { AutoTableColumnDirective } from './components/autotable/column/autotable-column.directive';
import { NgeFormModule } from './components/form/form.module';
import { LayoutModule } from './components/layout/layout.module';
import { AutoHostDirective } from './directives/autohost.directive';
import { NgeSharedModule } from './components/@shared/shared.module';



const exportsComponents = [
  NgxEsteComponent, AutoformComponent, AutoformNgModelComponent, AutotableComponent, AutomodalComponent
]
const exportsDirectives = [
  AutoHostDirective, AutoTableColumnDirective, AutoTableColumnCellDirective
]
@NgModule({
  declarations: [...exportsComponents, ...exportsDirectives],
  providers: [...exportsDirectives],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,

    NgbModule,
    MonacoEditorModule.forRoot(),
    NgeFormModule,
    NgeSharedModule
  ],
  exports: [...exportsComponents,...exportsDirectives, LayoutModule, NgeFormModule, NgeSharedModule],
  entryComponents: [AutomodalComponent]
})
export class NgxEsteModule {
  static forRoot(config: NgxEsteService): ModuleWithProviders<NgxEsteModule> {
    return {
      ngModule: NgxEsteModule,
      providers: [
        {provide: NgxEsteService, useValue: config },
        NgeDurationPipe
      ]
    };
  }

 }
