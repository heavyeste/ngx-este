import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User = new User();
  constructor() {}

  ngOnInit() {}

  /**
   * submit
   */
  public submit() {
    console.log(this.user);
  }
}
