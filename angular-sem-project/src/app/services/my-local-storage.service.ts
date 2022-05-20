import {Injectable} from "@angular/core";
import {CalculatorEntry} from "../models/calculator-entry.model";

const CALCULATOR_ENTRIES:string = 'calculator-entries';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class MyLocalStorageService {

  saveCalculatorEntries(entries: CalculatorEntry[]): void {
    localStorage.setItem(CALCULATOR_ENTRIES, JSON.stringify(entries));
    console.log("LocalStorage:", JSON.stringify(entries));
  }

  loadCalculatorEntries(): CalculatorEntry[] {
    const entries = localStorage.getItem(CALCULATOR_ENTRIES);
    if (!!entries) {
      return JSON.parse(entries);
    }
    return [];
  }

  deleteCalculatorEntries() {
    localStorage.removeItem(CALCULATOR_ENTRIES);
  }

  calculatorEntriesExist(): boolean {
    const entries = localStorage.getItem(CALCULATOR_ENTRIES);
    return !!entries;
  }

  signOut(): void {
    localStorage.removeItem(TOKEN_KEY)
  }
  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

}
