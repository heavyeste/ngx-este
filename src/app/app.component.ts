import { Component, OnInit } from '@angular/core';
import { AutoformP } from 'ngx-este';
import { from, of } from 'rxjs';
import { max } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'test01';
  user: User = new User();

  ngOnInit(): void {
    this.users = [];
    this.users.push(Object.assign(new User(), {
      id: 1,
      FirstName: "Esteban",
      LastName: "Lombardo",
      DateOfBirth: new Date()
    }));
    this.users.push(Object.assign(new User(), {
      id: 2,
      FirstName: "Lucia",
      LastName: "Napoleoni",
      DateOfBirth: new Date()
    }));
  }

  /**
   * submit
   */
  public submit() {
    console.log(this.user);
  }

  users: User[] = [];

  /**
   * addUser
   */
  public addUser(data: User) {
    let final_val = from(this.users).pipe(max((a, b) => ((a.id) && (b.id) && (a.id > b.id)) ? 1 : -1))
    .subscribe(x =>  {
      if(x.id)
        data.id = x.id + 1;
      this.users.push(data);
    });


  }

  /**
   * modifyUser
   */
  public modifyUser(data: User) {
    if(data.id) {
      var foundIndex = this.users.findIndex(x => x.id == data.id);
      if(foundIndex >= 0)
        this.users[foundIndex] = data;
    }
  }
  /**
   * removeUser
   */
  public removeUser(data: User) {

  }
}
export class User {
  // @AutoformP()
  public id?: number;
  @AutoformP({
    label: "Nome",
    required: true,
    placeholder: '...',
    group: 'info',
    group_label: "Informazioni personali",
    col_class: 'col-6'
  }
  )
  public FirstName?: string;
  @AutoformP(
    {
      label: "Cognome",
      placeholder: '...',
      group: 'info',
      col_class: 'col-6'
    }
  )
  public LastName?: string;


  @AutoformP(
    {
      label: "Date Of Birth",
      group: 'info-2',
      col_class: 'col-6'
    }
  )
  public DateOfBirth?: Date;
}
