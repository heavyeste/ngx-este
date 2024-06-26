import { AutoformP } from 'ngx-este';

export class User {
  // @AutoformP()
  public id?: number;
  @AutoformP({
    label: 'Nome',
    required: true,
    placeholder: '...',
    group: 'info',
    group_label: 'Informazioni personali',
    col_class: 'col-6',
  })
  public FirstName?: string;
  @AutoformP({
    label: 'Cognome',
    placeholder: '...',
    group: 'info',
    col_class: 'col-6',
  })
  public LastName?: string;

  @AutoformP({
    label: 'Date Of Birth',
    group: 'info-2',
    col_class: 'col-6',
  })
  public DateOfBirth?: Date;
}
