import { Component, OnInit } from '@angular/core';
import { AutoformP } from 'ngx-este';
import { from, of } from 'rxjs';
import { max } from 'rxjs/operators';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
}
