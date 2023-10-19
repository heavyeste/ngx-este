import 'reflect-metadata';
import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { from, of, zip } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { AutoformItem, AutoformSchema } from '../../models/autoformschema.model';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AutoformNgModelComponent } from '../autoformmodel/autoformmodel.component';
import { AutoHostDirective } from '../../directives/autohost.directive';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nge-automodal',
  templateUrl: './automodal.component.html',
  styleUrls: ['./automodal.component.scss']
})
export class AutomodalComponent implements OnInit {

  @ViewChild(AutoHostDirective, {static: true}) autoHost!: AutoHostDirective;

  @Input()
  modal:any;

  @Input()
  data:any;

  @Input()
  component:any;

  componentRef: any;

  @Input()
  title?:string;
  @Input()
  text?:string;

  @Input()
  canConfirm:() => boolean = () => true; // = () => true;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public activeModal: NgbActiveModal
    ) {

  }
  ngOnInit(): void {
    if(!this.text) {
      const viewContainerRef = this.autoHost.viewContainerRef;
      viewContainerRef.clear();

      this.componentRef = viewContainerRef.createComponent<any>(this.component);
      this.componentRef.instance.data = this.data;
    }
  }
  /**
   * Confirm
   */
  public Confirm() {
    if(this.canConfirm())
      this.activeModal.close("Confirm");
  }
  /**
   * Close
   */
  public Close() {
    this.activeModal.close("Close");
  }
}

