/* eslint-disable prettier/prettier */
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { TestService } from 'src/app/core/services/test.service';
import { NgeDebugLogViewerComponent } from 'ngx-este';

@Component({
  selector: 'app-test-test01',
  templateUrl: './test01.component.html',
  styleUrls: ['./test01.component.scss'],
})
export class TestTest01Component implements OnInit {
  @ViewChild('logViewer') logViewer: NgeDebugLogViewerComponent;
  // public debugLogViewerComponent: NgeDebugLogViewerComponent = inject(NgeDebugLogViewerComponent);
  public testService: TestService = inject(TestService);
  constructor() {}

  ngOnInit() {}
  /*
   * getData
   */
  getData() {
    this.logViewer.Info('getData Start...');
    this.testService
      .GetUsers()
      .then(async (x) => {
        this.logViewer.Warn('GetUsers().then');
        this.testService
          .GetPosts()
          .then((y) => {
            this.logViewer.Error('GetPosts().then');
          })
          .catch((reason) => {})
          .finally(() => {
            this.logViewer.Error('GetPosts().finally');
          });
      })
      .catch((reason) => {})
      .finally(() => {
        this.logViewer.Warn('GetUsers().finally');
      });
    this.logViewer.Info('getData End!');
  }
  /*
   * getData_AwaitAsync
   */
  async getData_AwaitAsync() {
    this.logViewer.Info('getData_AwaitAsync Start...');
    await this.testService
      .GetUsers()
      .then(async (x) => {
        this.logViewer.Warn('GetUsers().then');
        await this.testService
          .GetPosts()
          .then((y) => {
            this.logViewer.Error('GetPosts().then');
          })
          .catch((reason) => {})
          .finally(() => {
            this.logViewer.Error('GetPosts().finally');
          });
        //console.log(x);
      })
      .catch((reason) => {})
      .finally(() => {
        this.logViewer.Warn('GetUsers().finally');
      });
    this.logViewer.Info('getData_AwaitAsync End!');
  }
}
