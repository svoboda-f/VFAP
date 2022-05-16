import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

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
    public dialogRef: MatDialogRef<AuthDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }
}
