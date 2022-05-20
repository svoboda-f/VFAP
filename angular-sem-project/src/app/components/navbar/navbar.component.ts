import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import {UserService} from "../../services/user.service";
import {UserInfo} from "../../models/user-info.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$?: Observable<UserInfo>;

  constructor(
    private dialog: MatDialog,
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.refreshUser();
    this.user$ = this.userService.getCurrentUser();
  }

  login(): void {
    this.dialog.open(AuthDialogComponent, {
      width: '420px'
    })
  }

  logout() {
    this.userService.clearUser();
  }
}
