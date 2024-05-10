import { Component, OnInit, inject } from '@angular/core';
import { AppConfigService, LocalStorageService } from 'ngx-este';
import { NgeDurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'nge-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class NgeBaseComponent implements OnInit {
  public appConfigService = inject(AppConfigService);
  public ngeDurationPipe = inject(NgeDurationPipe);
  public localStorageService = inject(LocalStorageService);

  is_loading: boolean = false;
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
}
