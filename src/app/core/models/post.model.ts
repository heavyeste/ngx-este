import { AutoformP } from 'ngx-este';

export class Post {
  // @AutoformP()
  public userId: number;
  public id: number;

  @AutoformP({
    label: 'Titolo',
    //required: true,
    placeholder: '...',
    group: 'info',
    group_label: 'Informazioni personali',
    col_class: 'col-6',
  })
  public title?: string;
  @AutoformP({
    label: 'Contenuto',
    placeholder: '...',
    group: 'info',
    col_class: 'col-6',
  })
  public body?: string;
}
