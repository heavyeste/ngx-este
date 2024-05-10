import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(public http: HttpClient) {

  }
  /**
   * GetUsers
   */
  public Get(): Promise<Post[]> {
    return new Promise<Post[]>((resolve, reject) => {
      this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe({
        next: (value: any) => {
          resolve(value);
        },
        error: (reason: any) => {
          reject(reason);
        },
        complete: () => {
        }
      })
    });
  }
}
