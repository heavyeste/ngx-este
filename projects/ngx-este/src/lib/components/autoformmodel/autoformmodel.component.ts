import 'reflect-metadata';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { from, of, zip } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { AutoformItem, AutoformSchema } from '../../models/autoformschema.model';
import { NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';

export function onMonacoLoad() {

  var m: any = (window as any).monaco;
  m.languages.registerDocumentFormattingEditProvider('xml', {
    provideDocumentFormattingEdits: function (model: any, options: any, token: any) {
        return [
            {
                range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1
                },
                text: 'a'
            }
        ];
    }
});
}

@Component({
  selector: 'nge-autoformmodel',
  templateUrl: './autoformmodel.component.html',
  styleUrls: ['./autoformmodel.component.scss']
})
export class AutoformNgModelComponent implements OnInit {

  @Input()
  schema: AutoformSchema[] = [];

  @Input()
  schema_override: boolean = true;

  @Input()
  data:any;
  @Output()
  dataChange:EventEmitter<any> = new EventEmitter<any>();

  @Input()
  model_type:any;

  @Output() submitEvent = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  @Output() modifyEvent = new EventEmitter<any>();
  @Output() removeEvent = new EventEmitter<any>();

  @Input() showSubmit: boolean = false;
  @Input() showSubmit_Label: string = 'Submit';

  @Input() debug: boolean = false;
  @Input() readOnly: boolean = false;

  public formControls = {};
  public formGroup: FormGroup = new FormGroup({});

  login_form?: FormGroup;

  _keys?: any[];
  _keys_raw?: any[];

  monacoConfig: NgxMonacoEditorConfig = {
    baseUrl: 'assets',
    defaultOptions: {
      theme: 'vs-dark',
      language: 'html',
      autoIndent: true,
      formatOnPaste: true,
      formatOnType: true,

    },
    onMonacoLoad
  };
  constructor(public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if(this.schema && this.schema.length === 0) {
      var d = (this.data instanceof Array) ? this.data[0] : this.data;
      if(this.model_type) {
        d = this.model_type;
      }
      Object.keys(d).forEach((key) => {
        var currentType: AutoformSchema = Reflect.getMetadata('schema', d, key);
        if(currentType) {
          if(currentType.select_items != null)
          currentType.type = 'list';
          this.schema.push(currentType);
        }
      });
    }
    var currentSchema: AutoformSchema[] = [];
    currentSchema = this.schema.map( x => new AutoformSchema(x) );
    this._keys = [];
    this._keys_raw = [];
    currentSchema.forEach(x => {
      this._keys_raw.push(x.key);
    })
    from(currentSchema)
        .pipe(
          groupBy(
            p => (p.group == 'main' ? p.key : p.group),
            p => p
          ),
          mergeMap(g => zip(of(g.key), g.pipe(toArray())))
        )
        .subscribe(y => (this._keys) ? this._keys.push(y) : null);

    var validation_obj: any = {};
    currentSchema.forEach((x: any) => {
      validation_obj[x.key] = [{value:'' , disabled: this.readOnly}, x.validators]
    });
    setTimeout(() => {

      this.login_form = this.formBuilder.group(validation_obj);
    }, 100);
  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = (group.controls as any)[key];
      control.value = this.data[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };

  public get keys(): any[] | undefined {
    var res : any[] | undefined = [];
    res = this._keys;
    return res;
  }
  public get keys_raw(): any[] | undefined {
    var res : any[] | undefined = [];
    res = this._keys_raw;
    return res;
  }

  public GetSchema(key:string): AutoformSchema | undefined {
    var res: AutoformSchema | undefined = this.schema.find((x: AutoformSchema) => {
      return x.key == key;
    });
    return res;
  }
  public GetLabel(key:string) : string {
    var schema = this.GetSchema(key);
    if(schema && schema.label)
      return schema.label;
    return key;
  }
  public GetType(key:string) : string {
    var t = typeof(this.data[key]) + "";
    if(this.data[key] instanceof Date) {
      t = "date";
    }
    var schema = this.GetSchema(key);
    if(schema) {
      if(schema.select_items)
        t = 'list';

      if(schema.type)
        t = schema.type;
    }
    return t;
  }
  public GetTypeForm(key:string) : string {
    var res = '';
    var type = this.GetType(key);
    if(type == 'string')
      res = 'text';
    if(type == 'date')
      res = 'date';
    if(type == 'number')
      res = 'number';
    return res;
  };
  public GetReadOnly(key:string) : boolean {
    var schema = this.GetSchema(key);
    if(schema && schema.readonly && schema.readonly === true)
      return true;
    return false;
  };
  public GetRequired(key:string) : boolean {
    var schema = this.GetSchema(key);
    if(schema && schema.required && schema.required === true)
      return true;
    return false;
  };
  public GetPlaceholder(key:string) {
    let res : string = "Inserisci " + (this.GetLabel(key) ? this.GetLabel(key): key);
    var schema = this.GetSchema(key);
    if(schema && schema.placeholder)
      res = schema.placeholder;
    return res;
  }

  /**
   * GetValidationClass
   */
  public GetValidationClass(sc: any) : string {
    var res: string = '';
    if(this.GetRequired(sc.key)) {
      if(this.login_form && this.login_form.controls && this.login_form.controls[sc.key] && this.login_form.controls[sc.key].errors && this.login_form.controls[sc.key].errors['required']) {
        res = 'nge-form-required';
      }
    }
    return res;
  }
  /**
   * GetLabelHelp
   */
  public GetLabelHelp(key:string) {
    let res : string = "";
    var schema = this.GetSchema(key);
    if(schema && schema.label_help)
      res = schema.label_help;
    return res;
  }
  /**
   * GetSelectItems
   *
   */
  public GetSelectItems(key:string) : any[] | undefined{
    let res : any[] = [];
    var schema = this.GetSchema(key);
    if(schema && schema.select_items)
      res = schema.select_items;
    return res;
  }

  public getGroupLabel(key:any): string | undefined {
    let res: string | undefined = undefined;

    //var schema = this.GetSchema(key);
    if(key && key[1] && key[1][0])
      res = key[1][0].group_label;

    return res;
  }


  public get items2() : AutoformItem[] {
    var res : AutoformItem[] = [];
    if(this.data) {
      // Set Items
      Object.keys(this.data).forEach(key => {
        let item = new AutoformItem({ key: key });
        let value = this.data[key];
        let t = typeof(this.data[key]);
        item.type = t;
        if(this.data[key] instanceof Date) {
          item.type = "date";
        }

        item.value = value

        let pippo = this.schema.find(x => x.key == item.key);
        if(pippo) {
          item.schema = pippo;
          // Add items only if inside schema
        }
        //res.push(item);
        // switch(t) {
        //   case 'string':
        //     item.type = 'string';
        //     break;
        // }

      });

      // this.formGroup = this.formBuilder.group(this.formControls);

      // res.forEach((e, index) => {
      //   this.formGroup.addControl(e.key, new FormControl(e.value));
      //   // this.formControls[index] = new FormControl(e);
      // });
      // this.formGroup.valueChanges.subscribe(x => {
      //   this.data = this.formGroup.value;
      // });
    }
    return res;
  };


  public get items() : AutoformItem[] {
    var res : AutoformItem[] = [];
    if(this.data) {
      // Set Items
      Object.keys(this.data).forEach(key => {
        let item = new AutoformItem({ key: key });
        let value = this.data[key];
        let t = typeof(this.data[key]);
        item.type = t;
        if(this.data[key] instanceof Date) {
          item.type = "date";
        }

        item.value = value

        let pippo = this.schema.find(x => x.key == item.key);
        if(pippo) {
          item.schema = pippo;
          // Add items only if inside schema
          //res.push(item);
        }
        // switch(t) {
        //   case 'string':
        //     item.type = 'string';
        //     break;
        // }

      });
    }
    return res;
  };

  /**
   * CheckData
   */
  public CheckData() : boolean {
    var res: boolean = false;
    res = this.login_form && this.login_form.valid;
    // if(!res) {
    //   alert("errore");
    // }
    return res;
  }
  public submit() {

    if(this.CheckData()) {
      console.log("autformmodel - submit");
      this.submitEvent.emit(this.data);
    }
    // if(this.login_form && this.login_form.valid) {
    //   this.markFormTouched(this.login_form);
    //   this.submitEvent.emit(this.data);
    //   //this.submitEvent.emit({isValid: this.login_form.valid});
    // }
    // else {
    //   alert("errore");
    // }
  }
}

