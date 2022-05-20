import {Injectable} from "@angular/core";
import {Sex} from "../enums/sex.enum";

@Injectable({
  providedIn: 'root',
  }
)
export class CalculatorService {
  calculateBMR(weight: number, height: number, age: number, sex: Sex): number {
    const s: number = sex === Sex.Female ? -161 : 5;
    return Math.round(10 * weight + 6.25 * height - 5 * age + s);
  }

  calculateBMI(weight: number, height: number): number {
    const heightInMeters = height / 100;
    return Math.round((weight / (heightInMeters * heightInMeters))*10) / 10;
  }

  calculateAge(dateOfBirth: Date) {
    return Math.floor((new Date().getTime() - new Date(dateOfBirth).getTime()) / 3.15576e+10);
  }
}
