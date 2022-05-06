import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: boolean = false;
  loginButtonText: string = '';
  name: string = 'Filip';

  constructor() {
    this.loginButtonText = this.user ? 'Odhlásit' : 'Přihlásit';
  }

  ngOnInit(): void {

  }

  login(): void {
    this.user = !this.user;
    this.loginButtonText = this.user ? 'Odhlásit' : 'Přihlásit';
  }

}
