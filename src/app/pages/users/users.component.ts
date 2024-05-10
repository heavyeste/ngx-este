import { Component, OnInit } from '@angular/core';
import { from, max } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor() {}
  user: User = new User();
  users: User[] = [];

  ngOnInit(): void {
    this.users = [];
    this.users.push(
      Object.assign(new User(), {
        id: 1,
        FirstName: 'Esteban',
        LastName: 'Lombardo',
        DateOfBirth: new Date(),
      }),
    );
    this.users.push(
      Object.assign(new User(), {
        id: 2,
        FirstName: 'Lucia',
        LastName: 'Napoleoni',
        DateOfBirth: new Date(),
      }),
    );
  }

  /**
   * addUser
   */
  public addUser(data: User) {
    let final_val = from(this.users)
      .pipe(max((a, b) => (a.id && b.id && a.id > b.id ? 1 : -1)))
      .subscribe((x) => {
        if (x.id) data.id = x.id + 1;
        this.users.push(data);
      });
  }

  /**
   * modifyUser
   */
  public modifyUser(data: User) {
    if (data.id) {
      var foundIndex = this.users.findIndex((x) => x.id == data.id);
      if (foundIndex >= 0) this.users[foundIndex] = data;
    }
  }
  /**
   * removeUser
   */
  public removeUser(data: User) {}
}
