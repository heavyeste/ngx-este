import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxEsteComponent } from './ngx-este.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { AutoformComponent } from './components/autoform/autoform.component';
import { AutoformNgModelComponent } from './components/autoformmodel/autoformmodel.component';
import { AutotableComponent } from './components/autotable/autotable.component';
import { AutomodalComponent } from './components/automodal/automodal.component';
import { AutoHostDirective } from './directives/autohost.directive';
import { NgeFormButtonComponent } from './components/form/button/button.component';
import { AutoTableColumnDirective } from './components/autotable/column/autotable-column.directive';
import { AutoTableColumnCellDirective } from './components/autotable/column/autotable-column-cell.directive';
import { LayoutMainComponent } from './components/layout/main/main.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './components/layout/layout.module';
import { NgxEsteService } from 'ngx-este';



const exportsComponents = [
  NgxEsteComponent, AutoformComponent, AutoformNgModelComponent, AutotableComponent, AutomodalComponent, NgeFormButtonComponent
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
    MonacoEditorModule.forRoot()
  ],
  exports: [...exportsComponents,...exportsDirectives, LayoutModule],
  entryComponents: [AutomodalComponent]
})
export class NgxEsteModule {
  static forRoot(config: NgxEsteService): ModuleWithProviders<NgxEsteModule> {
    return {
      ngModule: NgxEsteModule,
      providers: [
        {provide: NgxEsteService, useValue: config }
      ]
    };
  }

 }
