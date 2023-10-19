import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nge-autoform',
  templateUrl: './autoform.component.html',
  styleUrls: ['./autoform.component.scss']
})
export class AutoformComponent implements OnInit {
  @Input()
  data:any;

  constructor() { }

  ngOnInit() {
  }

}
