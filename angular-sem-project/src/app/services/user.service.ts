import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../models/user-info.model';
import { MyLocalStorageService } from './my-local-storage.service';
import { environment } from "../../environments/environment";

const SERVER_URL = environment.serverURL;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly currentUser: ReplaySubject<UserInfo> = new ReplaySubject<UserInfo>(1);

  constructor(
    private readonly tokenStorage: MyLocalStorageService,
    private readonly http: HttpClient
  ) {}

  refreshUser(): void {
    this.http.get<UserInfo>(SERVER_URL + '/info/').subscribe({
      next: (user) => {
        this.currentUser.next(user);
      },
      error: (e) => {
        console.log(e);
        // this.tokenStorage.signOut();
        // @ts-ignore
        this.currentUser.next();
      },
    });
  }

  clearUser(): void {
    // @ts-ignore
    this.currentUser.next();
    this.tokenStorage.signOut();
  }

  getCurrentUser(): Observable<UserInfo> {
    return this.currentUser;
  }
}
