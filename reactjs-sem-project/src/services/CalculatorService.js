export default class CalculatorService {
    static calculateBMR(weight, height, age, sex) {
        const s = sex === 'female' ? -161 : 5;
        return Math.round(10 * weight + 6.25 * height - 5 * age + s);
    }

    static calculateBMI(weight, height) {
        const heightInMeters = height / 100;
        return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
    }

    static calculateAge(dateOfBirth) {
        return Math.floor((new Date().getTime() - new Date(dateOfBirth).getTime()) / 3.15576e+10);
    }
}
