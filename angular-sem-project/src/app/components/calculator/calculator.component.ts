import { Component, OnInit } from '@angular/core';
import {CalculatorService} from "../../services/calculator.service";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

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

  calculate(): void {
    console.log('BMR', this.calculatorService.calculateBMR(
      this.result.controls['weight'].value,
      this.result.controls['height'].value,
      this.result.controls['age'].value,
      this.result.controls['sex'].value
      ));
    console.log('BMI', this.calculatorService.calculateBMI(
      this.result.controls['weight'].value,
      this.result.controls['height'].value
    ))
  }
}
