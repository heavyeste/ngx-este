import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { X } from 'angular-feather/icons';
import { from, of, zip } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

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

  @Output() submitEvent = new EventEmitter<any>();

  @Input() showSubmit: boolean = false;
  @Input() showSubmit_Label: string = 'Submit';
  
  @Input() debug: boolean = false;
  @Input() readOnly: boolean = false;

  public formControls = {};
  public formGroup: FormGroup = new FormGroup({});

  // public get keys(): string[] {
  //   var res : string[] = [];
  //   if(this.data) {
  //     // var currentKeys = Object.keys(this.data);
  //     if(this.schema && this.schema_override) {
  //       res = this.schema.map(x => x.key);
  //     }
  //     else {
  //       res = Object.keys(this.data);
  //     }
  //   }
  //   return res;
  // }
  login_form: FormGroup;
  
  _keys: any[];
  ngOnInit(): void {
    // if(this.data) {
    //   // var currentKeys = Object.keys(this.data);
    //   if(this.schema && this.schema_override) {
    //     //this._keys = this.schema;
    //   }
    //   else {
    //     // res = Object.keys(this.data);
    //   }
    // }
    

    var currentSchema: AutoformSchema[] = [];
    currentSchema = this.schema.map( x => new AutoformSchema(x) );
    this._keys = [];
    from(currentSchema)
        .pipe(
          groupBy(
            p => (p.group == 'main' ? p.key : p.group),
            p => p
          ),
          mergeMap(g => zip(of(g.key), g.pipe(toArray())))
        )
        .subscribe(y => this._keys.push(y));

    var validation_obj: any = {};
    currentSchema.forEach(x => { 
      validation_obj[x.key] = [{value:'' , disabled: this.readOnly}, x.validators]
    });
    this.login_form = this.formBuilder.group(validation_obj);

    // this.login_form = this.formBuilder.group({
    //   'first_name' : [null, Validators.required]
    // });
  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      control.value = this.data[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };

  public get keys(): any[] {
    var res : any[] = [];
    res = this._keys;
    return res;
  }
  public GetSchema(key:string): AutoformSchema {
    var res: AutoformSchema = null;
    res = this.schema.find((x: AutoformSchema) => {
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
    if(schema.select_items)
      t = 'list';

    if(schema.type)
      t = schema.type;
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
  public GetPlaceholder(key:string) {
    let res : string = "Inserisci " + (this.GetLabel(key) ? this.GetLabel(key): key); 
    var schema = this.GetSchema(key);
    if(schema && schema.placeholder)
      res = schema.placeholder;
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
   */
 public GetSelectItems(key:string) {
    let res : any[] = null; 
    var schema = this.GetSchema(key);
    if(schema && schema.select_items)
      res = schema.select_items;
    return res;
  }

public getGroupLabel(key:any): string {
  let res: string = null;

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
  constructor(private formBuilder: FormBuilder) {
    
  }

  submit() {
    
    // this.submitEvent.emit(this.data);
    this.markFormTouched(this.login_form);
    this.submitEvent.emit({isValid: this.login_form.valid}); 
    // if (this.login_form.valid) {
      
    // }
    // else {
    //   alert("errore");
    // }
  }
}
export class AutoformItem {
  schema?: AutoformSchema;
  key : string;
  type : string;
  get type_form() : string {
    var res = '';
    if(this.type == 'string')
      res = 'text';
    if(this.type == 'date')
      res = 'date';
    return res;
  };
  value: any;

  public constructor(init?:Partial<AutoformItem>) {
    Object.assign(this, init);
  }

  /**
   * GetLabel
   */
  public GetLabel() {
    let res = this.key;
    if(this.schema)
      res = this.schema.label;
    return res;
  }

  /**
   * GetToolTip
   */
  public GetPlaceholder() {
    let res : string = "Inserisci " + this.key; 
    if(this.schema && this.schema.placeholder)
      res = this.schema.placeholder;
    return res;
  }
  /**
   * GetLabelHelp
   */
  public GetLabelHelp() {
    let res : string = ""; 
    if(this.schema && this.schema.label_help)
      res = this.schema.label_help;
    return res;
  }
}

export class AutoformSchema {
  key : string;
  label: string;
  placeholder?: string;
  label_help?: string;
  readonly?: boolean = false;
  required?: boolean = true;

  select_items?:any[] = null;

  public type?: string = null;

  public validators?: Validators[] = [];

  public group?: string = 'main';
  public group_label?: string;
  public col_class?: string = 'col-12';

  public constructor(init?:Partial<AutoformSchema>) {
    Object.assign(this, init);
  }
}
