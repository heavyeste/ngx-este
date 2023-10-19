import { Component, ContentChild, ContentChildren, Input, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import 'reflect-metadata';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AutoformNgModelComponent } from '../autoformmodel/autoformmodel.component';
import { AutomodalComponent } from '../automodal/automodal.component';
import { AutoTableColumnDirective } from './column/autotable-column.directive';
import { TableColumn } from './autotable.helper';
// import {deepCopy} from "@angular-devkit/core/src/utils/object";
import * as _ from 'lodash';
import { filter, from, map } from 'rxjs';
import { AutoformSchema } from 'ngx-este';

@Component({
  selector: 'nge-autotable',
  templateUrl: './autotable.component.html',
  styleUrls: ['./autotable.component.scss']
})
export class AutotableComponent extends AutoformNgModelComponent implements OnInit {

  @Input()
  title?:string;

  constructor(public override formBuilder: FormBuilder, private modalService: NgbModal) {
    super(formBuilder);
  }

  public get columnTemplates(): { [key: string]: TemplateRef<any> } {
    if (this.columnDefinitions != null) {
      const columnTemplates: { [key: string]: TemplateRef<any> } = {};
      for (const columnDefinition of this.columnDefinitions.toArray()) {
        columnTemplates[columnDefinition.columnName] =
          columnDefinition.columnTemplate;
      }
      return columnTemplates;
    } else {
      return {};
    }
  }

  _columnTemplates: QueryList<AutoTableColumnDirective> | any;

  /**
   * Column templates gathered from `ContentChildren`
   * if described in your markup.
   */
  @ContentChildren(AutoTableColumnDirective)
  columnDefinitions!: QueryList<AutoTableColumnDirective>;

  public get columnDefinitionsExtra(): AutoTableColumnDirective[] {
    if(this.columnDefinitions)
      return this.columnDefinitions.filter(x => x.extra);
    else
      return [];
  }
  public get displayedColumns() {
    return this.schema.map((columnList) => columnList.key);
  }
  public identity<Type>(arg: Type): Type {
    return arg;
  }
  public generate<K extends PropertyKey>(...keys: K[]) {
    return Object.fromEntries(keys.map(k => [k, ""])) as { [P in K]: string };
  }
  ngAfterContentInit() {
    for (const columnDefinition of this.columnDefinitions.toArray()) {
      this.columnTemplates[columnDefinition.columnName] =
        columnDefinition.columnTemplate;
    }
  }
  public onCellClick(e: any, options?: any) {
    console.log(this.columnDefinitions);
  }
  /**
   * GetOrderBy
   */
  public GetOrderBy(key: string) : string {
    var res: string = '';
    const example = from(this.schema).pipe(filter(num => num.key === key));
    example.subscribe((value: AutoformSchema) => {
      if(value) {
        res = value.order_by;
      }
    });
    return res;
  }
  /**
   * SetOrderBy
   */
  public SetOrderBy(key: string) : string {
    var res: string = '';
    this.schema.forEach((value: AutoformSchema) => {
      if(value.key === key) {
        if(!value.order_by)
        value.order_by = 'ASC';
        else {
          if (value.order_by === 'ASC')
            value.order_by = 'DESC';
          else
            value.order_by = 'ASC';
        }
        res = value.order_by
      }
      else {
        value.order_by = '';
      }
    })
    // const example = from(this.schema).pipe(filter(num => num.key === key));
    // example.subscribe(x => {
    //   if(x) {
    //     if(!x.order_by)
    //       x.order_by = 'ASC';
    //     else {
    //       if (x.order_by === 'ASC')
    //         x.order_by = 'DESC';
    //       else
    //         x.order_by = 'ASC';
    //     }
    //     res = x.order_by
    //   }
    // });
    return res;
  }
  /**
   * OrderBy
   */
  public OrderBy(key: string) {
    var order_by = this.SetOrderBy(key);
    this.data.sort((a:any, b:any) => {
      if (order_by === 'ASC')
        return a[key] < b[key] ? -1 : 1;
      else
        return a[key] > b[key] ? -1 : 1;
     });
  }

  /**
   * Modify
   */
  public Modify(item: any) {
    const modalRef = this.modalService.open(AutomodalComponent, {
      size: 'xl',
      // fullscreen: true
    });

		modalRef.componentInstance.data = _.cloneDeep(item);
		modalRef.componentInstance.modal = modalRef;
		modalRef.componentInstance.title = "Modifica";
		modalRef.componentInstance.component = AutoformNgModelComponent;
    (modalRef.componentInstance as AutomodalComponent).canConfirm = () => {
      return (modalRef.componentInstance.componentRef.instance as AutoformNgModelComponent).CheckData();
    } ;
    modalRef.result.then((data:any) => {
      //(modalRef.componentInstance.componentRef.instance as AutoformNgModelComponent).submitEvent = this.submitEvent;
      var currentModel = (modalRef.componentInstance.componentRef.instance as AutoformNgModelComponent);
      if(currentModel.CheckData())
        this.modifyEvent.emit(currentModel.data);

      // console.log(data);
    });
    //(modalRef.componentInstance as AutomodalComponent).Confirm. = modalRef.componentInstance.component.submitEvent;
  }
  /**
   * Add
   */
  public Add() {
    const modalRef = this.modalService.open(AutomodalComponent, {
      size: 'xl',
      // fullscreen: true
    });
		modalRef.componentInstance.data = this.model_type;
		modalRef.componentInstance.modal = modalRef;
		modalRef.componentInstance.title = "Aggiungi";
		modalRef.componentInstance.component = AutoformNgModelComponent;
    (modalRef.componentInstance as AutomodalComponent).canConfirm = () => {
      return (modalRef.componentInstance.componentRef.instance as AutoformNgModelComponent).CheckData();
    } ;
    modalRef.result.then((data:any) => {
      //(modalRef.componentInstance.componentRef.instance as AutoformNgModelComponent).submitEvent = this.submitEvent;
      var currentModel = (modalRef.componentInstance.componentRef.instance as AutoformNgModelComponent);
      if(currentModel.CheckData())
        this.addEvent.emit(currentModel.data);

    });
  }

  /**
   * Remove
   */
  public Remove(item: any) {
    const modalRef = this.modalService.open(AutomodalComponent, {
      // size: 'xl',
      // fullscreen: true
    });
    //this.data
		modalRef.componentInstance.data = item;
		modalRef.componentInstance.modal = modalRef;
		modalRef.componentInstance.title = "Rimuovi";
		modalRef.componentInstance.text = 'Sei sicuro di voler eliminare la riga?';
    modalRef.result.then((data:any) => {
      if(data == "Confirm") {
        this.removeEvent.emit(item);
      }
    });
  }
}

