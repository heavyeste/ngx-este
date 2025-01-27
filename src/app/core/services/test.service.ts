/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(public http: HttpClient) {}
  /**
   * GetPosts
   */
  public GetPosts(): Promise<Post[]> {
    return new Promise<Post[]>((resolve, reject) => {
      this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe({
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
  /**
   * GetUsers
   */
  public GetUsers(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.http.get('https://jsonplaceholder.typicode.com/users').subscribe({
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
