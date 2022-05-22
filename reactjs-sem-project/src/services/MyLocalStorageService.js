const CALCULATOR_ENTRIES = 'calculator-entries';
const TOKEN_KEY = 'auth-token';

export default class MyLocalStorageService{

    saveCalculatorEntries(entries) {
        localStorage.setItem(CALCULATOR_ENTRIES, JSON.stringify(entries));
    }

    loadCalculatorEntries() {
        const entries = localStorage.getItem(CALCULATOR_ENTRIES);
        if (!!entries) {
            return JSON.parse(entries);
        }
        return [];
    }

    deleteCalculatorEntries() {
        localStorage.removeItem(CALCULATOR_ENTRIES);
    }

    calculatorEntriesExist() {
        const entries = localStorage.getItem(CALCULATOR_ENTRIES);
        return !!entries;
    }

    static signOut() {
        localStorage.removeItem(TOKEN_KEY);
    }

    static saveToken(token) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }

    static getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }
}
