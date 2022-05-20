import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const SERVER_URL = environment.serverURL;
@Component({
  selector: 'app-new-diary-entry-dialog',
  templateUrl: './new-diary-entry-dialog.component.html',
  styleUrls: ['./new-diary-entry-dialog.component.scss']
})
export class NewDiaryEntryDialogComponent implements OnInit {
  fgNewEntry = this.fb.group({
    date: new FormControl(new Date()),
    weight: new FormControl(undefined)
  })
  today: Date;

  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<NewDiaryEntryDialogComponent>,
    private readonly http: HttpClient
  ) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.today = new Date();
  }

  onSubmit() {
    const entry = {
      date: this.fgNewEntry.controls['date'].value,
      weight: this.fgNewEntry.controls['weight'].value
    }
    console.log(this.fgNewEntry.controls['date'].value);
    console.log(this.fgNewEntry.controls['weight'].value);
    this.http.post(SERVER_URL+'/entries',entry).subscribe();
    this.dialogRef.close(entry);
  }
}
