import { Component, OnInit } from '@angular/core';
import {CalculatorService} from "../../services/calculator.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {Sex} from "../../enums/sex.enum";
import {MatTableDataSource} from "@angular/material/table";

interface CalculatorEntry {
  date: string;
  age: number;
  sex: Sex;
  height: number;
  weight: number;
  BMI?: number;
  BMR?: number;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  type: number = 0;
  keyExists: boolean = false;
  entries: CalculatorEntry[] = [];
  entriesDataSource = new MatTableDataSource(this.entries);
  displayedColumns: string[] = ['date', 'age', 'sex', 'height', 'weight', 'BMI', 'BMR']

  result = this.formBuilder.group({
    age: new FormControl(undefined),
    sex: new FormControl(undefined),
    height: new FormControl(undefined),
    weight: new FormControl(undefined)
  });

  constructor(
    private readonly calculatorService: CalculatorService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  calculate(): string {
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

    this.keyExists = true;
    console.log(this.entries);
    this.type = 1;
    return this.entriesDataSource.filter = "";
  }
}
