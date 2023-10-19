import { Validators } from "@angular/forms";

export class AutoformItem {
  schema?: AutoformSchema;
  key? : string;
  type? : string;
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
  key? : string;
  label?: string;
  placeholder?: string;
  label_help?: string;
  readonly?: boolean = false;
  required?: boolean = false;
  auto_template?: boolean = true;

  select_items?:any[] | null = null;

  public type?: string | null = null;

  public validators?: Validators[] = [];

  public group?: string = 'main';
  public group_label?: string;
  public col_class?: string = 'col-12';

  public constructor(init?:Partial<AutoformSchema>) {
    Object.assign(this, init);
  }

  public order_by?:string = '';
  public search_string?:string = '';
}
