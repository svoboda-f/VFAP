import { Component, OnInit } from '@angular/core';
import {CalculatorService} from "../../services/calculator.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {CalculatorEntry} from "../../models/calculator-entry.model";
import {MatTableDataSource} from "@angular/material/table";
import {MyLocalStorageService} from "../../services/my-local-storage.service";
import {Sex} from "../../enums/sex.enum";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  type: number = 0;
  keyExists: boolean = false;
  entries: CalculatorEntry[] = [];
  entriesDataSource: any;
  displayedColumns: string[] = ['date', 'age', 'sex', 'height', 'weight', 'BMI', 'BMR']

  result = this.formBuilder.group({
    age: new FormControl(undefined),
    sex: new FormControl(Sex.Male),
    height: new FormControl(undefined),
    weight: new FormControl(undefined)
  });

  constructor(
    private readonly calculatorService: CalculatorService,
    private readonly myLocalStorageService: MyLocalStorageService,
    private readonly formBuilder: FormBuilder,
    private readonly snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    console.log("ONINIT", this.entries);
    this.entries = this.myLocalStorageService.loadCalculatorEntries();
    console.log("ONINIT-přiřazení", this.entries);
    this.keyExists = this.myLocalStorageService.calculatorEntriesExist();
    this.entriesDataSource = new MatTableDataSource(this.entries);
  }

  calculate(): string {
    this.entriesDataSource = new MatTableDataSource(this.entries);
    const date = new Date().toISOString().split('T')[0];

    const calculatorEntry: CalculatorEntry = {
      date: date,
      age: this.result.controls['age'].value,
      sex: this.result.controls['sex'].value,
      height: this.result.controls['height'].value,
      weight: this.result.controls['weight'].value,
    };

    calculatorEntry.BMI = this.calculatorService.calculateBMI(calculatorEntry.weight, calculatorEntry.height);
    calculatorEntry.BMR = this.calculatorService.calculateBMR(calculatorEntry.weight,calculatorEntry.height,calculatorEntry.age,calculatorEntry.sex);
    if(this.entriesDataSource.data.length == 5) {
      this.entriesDataSource.data.pop();
    }
    this.entriesDataSource.data.unshift(calculatorEntry);
    this.myLocalStorageService.saveCalculatorEntries(this.entries);
    this.keyExists = true;
    console.log(this.entries);
    this.type = 1;
    return this.entriesDataSource.filter = "";
  }

  deleteEntries(): void {
    this.myLocalStorageService.deleteCalculatorEntries();
    this.keyExists = false;
    this.entriesDataSource = null;
    this.entries = [];
    this.snackbar.open('Data smazána', undefined, {
      duration: 3000
    })
  }
}
