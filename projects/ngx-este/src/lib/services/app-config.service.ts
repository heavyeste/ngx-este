// import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private appConfig: any;

  constructor(private http: HttpClient) {}

  loadAppConfig() {
    // ${environment.base_href}
    return this.http
      .get(`/assets/config/app.config.json`)
      .toPromise()
      .then((data) => {
        this.appConfig = data;
      });
  }
  /**
   * Get
   */
  public Get(key: string): string {
    return this.appConfig[key];
  }
}
