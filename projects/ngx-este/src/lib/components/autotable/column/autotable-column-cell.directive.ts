import { ContentChild, Directive, Input, TemplateRef } from "@angular/core";

// https://github.com/swimlane/ngx-datatable/blob/master/projects/swimlane/ngx-datatable/src/lib/components/columns/column.directive.ts
@Directive({ selector: 'nge-autotable-column-cell' })
export class AutoTableColumnCellDirective /*implements OnChanges */ {
  // constructor(public template: TemplateRef<any>) {}
  constructor() {}
}
