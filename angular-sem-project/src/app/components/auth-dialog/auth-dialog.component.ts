import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  fgLogin = this.formBuilder.group({
    username: new FormControl(undefined, Validators.required),
    password: new FormControl( undefined, Validators.required),
  })

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    public dialogRef: MatDialogRef<AuthDialogComponent>,
    private readonly snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.fgLogin.controls['username'].value === null) {
      this.snackbar.open('Nezadal jste jméno', undefined, {
        duration: 3000,

      });
      return;
    }
    this.loginAndRefreshUser(
      this.fgLogin.controls['username'].value,
      this.fgLogin.controls['password'].value
    );
  }

  loginAndRefreshUser(username: string, password: string): void {
    this.authService
      .login(username, password)
      // .pipe(this.blockUiService.blockPipe())
      .subscribe({
        next: () => {
          this.userService.refreshUser();
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
          let errorMessage;
          if(err.status === 0){
            errorMessage = 'Někdo zapomněl zapnout backend';
          } else {
            errorMessage = 'Zadal jste špatné údaje hehe';
          }
          this.snackbar.open(errorMessage, undefined, {
            duration: 3000
          } );
        },
      });
  }

}
