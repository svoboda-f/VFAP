import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DiaryEntry} from "../../models/diary-entry.model";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import { environment } from "../../../environments/environment";
import {Router} from "@angular/router";
import {CalculatorService} from "../../services/calculator.service";
import {UserService} from "../../services/user.service";
import {take} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {NewDiaryEntryDialogComponent} from "../new-diary-entry-dialog/new-diary-entry-dialog.component";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";

const SERVER_URL = environment.serverURL;

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit, AfterViewInit {

  entries: DiaryEntry[] = [];
  entriesDataSource:MatTableDataSource<DiaryEntry> = new MatTableDataSource();
  displayedColumns: string[] = ['date', 'weight', 'BMI', 'BMR'];
  selectedEntry?: DiaryEntry;

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly calculator: CalculatorService,
    private readonly user: UserService,
    private dialog: MatDialog,
    private readonly snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadDataToTable();
  }

  ngAfterViewInit() {
    if(this.sort){
      this.entriesDataSource.sort = this.sort;
    }
    if(this.paginator){
      this.entriesDataSource.paginator = this.paginator;
    }

  }

  calculateBMIandBMR() {
    this.user.getCurrentUser().pipe(take(1)).subscribe(
      value => {
        const height = value.height;
        const age = this.calculator.calculateAge(value.dateOfBirth);
        const sex = value.sex;
        this.entries.forEach(value => {
          value.BMR = this.calculator.calculateBMI(value.weight, height);
          value.BMI = this.calculator.calculateBMR(value.weight,height,age,sex);
          console.log(value.BMR + ' ' + value.BMI);
        });
        this.entriesDataSource = new MatTableDataSource<DiaryEntry>(this.entries);
        // @ts-ignore
        this.entriesDataSource.paginator = this.paginator;
        // @ts-ignore
        this.entriesDataSource.sort = this.sort;
      }
    );
  }

  loadDataToTable(): void {
    this.http.get<DiaryEntry[]>(`${SERVER_URL}/entries`).subscribe({
      next: entries => {
        this.entries = entries;
        this.entriesDataSource.data = this.entries;
        this.calculateBMIandBMR();
      },
      error: err => {
        console.log(err);
        this.router.navigate(['/']);
      }
    });
    // @ts-ignore
    this.entriesDataSource.sort = this.sort ;

  }

  openAddDialog(): void {
    const dialog = this.dialog.open(NewDiaryEntryDialogComponent, {
      width: '420px'
    });
    dialog.afterClosed().subscribe(() => {
      this.loadDataToTable();
    })
  }

  setClickedRow(row: DiaryEntry): void {
    console.log("Před:", this.selectedEntry);
    if(this.selectedEntry === row){
      this.selectedEntry = undefined;
      console.log("Po:",this.selectedEntry);
      return;
    }
    this.selectedEntry = row;
    console.log("Po:",this.selectedEntry);
  }

  deleteEntry() {
    this.http.delete(SERVER_URL+'/entries/delete/'+this.selectedEntry?.id).subscribe(()=> {
      this.selectedEntry = undefined;
      this.loadDataToTable();
      this.snackbar.open('Záznam smazána', undefined, {
        duration: 3000
      });
    });

  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.entriesDataSource.filter = filterValue.trim().toLowerCase();
  }

}
