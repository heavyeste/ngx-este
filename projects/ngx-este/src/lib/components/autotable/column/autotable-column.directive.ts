import { ContentChild, Directive, Input, TemplateRef } from "@angular/core";
import { AutoTableColumnCellDirective } from "./autotable-column-cell.directive";

// https://github.com/swimlane/ngx-datatable/blob/master/projects/swimlane/ngx-datatable/src/lib/components/columns/column.directive.ts
@Directive({ selector: 'nge-autotable-column' })
export class AutoTableColumnDirective /*implements OnChanges */ {
  @Input()
  columnName?: string;
  @Input()
  extra?: boolean = false;

  @Input()
  title?: string = '';

  @ContentChild(TemplateRef) public columnTemplate!: TemplateRef<any>;

  // @Input('cellTemplate')
  // _cellTemplateInput: TemplateRef<any>;

  // // @ContentChild(AutoTableColumnCellDirective, { read: TemplateRef, static: true })
  // @ContentChild(AutoTableColumnCellDirective, { static: true })
  // _cellTemplateQuery: TemplateRef<any>;

  // get cellTemplate(): TemplateRef<any> {
  //   return this._cellTemplateInput || this._cellTemplateQuery;
  // }
  // ngOnInit () {

  //   console.log('AutoTableColumnDirective',this.cellTemplate)
  // }

}
