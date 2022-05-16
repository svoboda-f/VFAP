import {Sex} from "../enums/sex.enum";

export interface CalculatorEntry {
  date: string;
  age: number;
  sex: Sex;
  height: number;
  weight: number;
  BMI?: number;
  BMR?: number;
}
