import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserInfo} from "../../models/user-info.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo?: UserInfo;

  constructor(
    private readonly user: UserService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.user.getCurrentUser().subscribe({
      next: u => {
        this.userInfo = u;
        if (!u) {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.router.navigate(['/']);
      }
      }
    )
  }

}
