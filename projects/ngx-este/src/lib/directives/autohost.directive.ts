import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[autoHost]',
})
export class AutoHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
