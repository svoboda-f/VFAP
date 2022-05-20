import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyLocalStorageService } from './my-local-storage.service';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { environment } from "../../environments/environment";

const SERVER_URL = environment.serverURL;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly tokenStorageService: MyLocalStorageService,
    private readonly userService: UserService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        SERVER_URL + '/login',
        {
          username,
          password,
        },
        httpOptions
      )
      .pipe(
        tap((response: any) => {
          if (response?.token) {
            console.log(response.token);
            this.tokenStorageService.saveToken(response.token);
          }
        })
      );
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.userService.clearUser();
  }
}
