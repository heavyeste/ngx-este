import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConfigService } from 'ngx-este';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  public httpClient = inject(HttpClient);
  public appConfigService = inject(AppConfigService);
  table_name: string;
  constructor() {}

  public get BaseUrl(): string {
    var url = this.appConfigService.Get('BASE_URL');
    var DYNAMIC_BASE_URL = this.appConfigService.Get('DYNAMIC_BASE_URL');
    var API_VERSION = this.appConfigService.Get('API_VERSION');
    // if (DYNAMIC_BASE_URL === '1') {
    //   url = this.locationStrategy.getBaseHref().replace('/ng/', '/api');
    // }
    return url;
  }
  /*
  *  Per retrocompatibilità con versione vecchia (es: TraccLotti)
  *  creo una nuova variabile con l'API_VERSION
  */
 public get BaseUrl_V(): string {
    var url = this.appConfigService.Get('BASE_URL');
    var DYNAMIC_BASE_URL = this.appConfigService.Get('DYNAMIC_BASE_URL');

    var API_VERSION = this.appConfigService.Get('API_VERSION');
    if(!API_VERSION)
      API_VERSION = "1"; // Default value

    // if (DYNAMIC_BASE_URL === '1') {
    //   url = this.locationStrategy.getBaseHref().replace('/ng/', '/api');
    // }
    if(API_VERSION && Number(API_VERSION) > 0) {
      url += `/v${API_VERSION}`;
    }
    return url;
  }

  get(options?: BaseServiceOptions): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      if (options) {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('options', JSON.stringify(options));
        this.httpClient.get(`${this.BaseUrl_V}/${this.table_name}`, { params: httpParams }).subscribe({
          next: (value: any) => {
            resolve(value);
          },
          error: (reason: any) => {
            reject(reason);
          },
          complete: () => {},
        });
      } else {
        this.httpClient.get(`${this.BaseUrl_V}/${this.table_name}`).subscribe({
          next: (value: any) => {
            resolve(value);
          },
          error: (reason: any) => {
            reject(reason);
          },
          complete: () => {},
        });
      }
    });
  }
  save(item: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.httpClient.post(`${this.BaseUrl_V}/${this.table_name}`, item).subscribe({
        next: (value: any) => {
          resolve(value);
        },
        error: (reason: any) => {
          reject(reason);
        },
        complete: () => {},
      });
    });
  }
  delete(item: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.httpClient.delete(`${this.BaseUrl_V}/${this.table_name}`, {
        body: item
      }).subscribe({
        next: (value: any) => {
          resolve(value);
        },
        error: (reason: any) => {
          reject(reason);
        },
        complete: () => {},
      });
    });
  }
}
export interface BaseServiceOptions {
  select?: string[];
  top?: number;
  where?: BaseServiceOptions_Where;
  groupBy?: BaseServiceOptions_GroupBy;
  orderBy?: string;
  orderBy_direction?: string;
}
export interface BaseServiceOptions_Where {
  type: 'AND' | 'OR';
  items: BaseServiceOptions_Where_Item[];
}
export interface BaseServiceOptions_Where_Item {
  field: string;
  operation: 'like' | '=' | '<>' | '<' | '>' | '<=' | '>=';
  value: string;
}
export interface BaseServiceOptions_GroupBy {
  fields: string[];
}
