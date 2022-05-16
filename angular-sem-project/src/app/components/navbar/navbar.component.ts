import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: boolean = false;
  loginButtonText: string = '';
  name: string = 'Filip';

  constructor(
    private dialog: MatDialog,
  ) {
    this.loginButtonText = this.user ? 'Odhlásit' : 'Přihlásit';
  }

  ngOnInit(): void {

  }

  login(): void {
    // this.user = !this.user;
    // this.loginButtonText = this.user ? 'Odhlásit' : 'Přihlásit';
    this.dialog.open(AuthDialogComponent, {
      width: '420px'
    })
  }

}
