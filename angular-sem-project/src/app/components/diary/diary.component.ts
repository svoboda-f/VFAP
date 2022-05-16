import { Component, OnInit } from '@angular/core';
import {DiaryEntry} from "../../models/diary-entry.model";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  entries: DiaryEntry[] = [];
  entriesDataSource: any;
  displayedColumns: string[] = ['date', 'weight', 'BMI', 'BMR'];
  // TODELETE
  userId: string = '1';

  constructor(
    private readonly http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get<DiaryEntry[]>(`http://localhost:9090/${this.userId}/entries`).subscribe(
      entries => {
        this.entries = entries;
        this.entriesDataSource = new MatTableDataSource(this.entries);
      }
    );
  }

}
