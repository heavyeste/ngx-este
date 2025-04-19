import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * GetUsers
   */
  public GetUsers(): Promise<User> {
    return new Promise<User>((resolve, reject) => {});
  }
}
