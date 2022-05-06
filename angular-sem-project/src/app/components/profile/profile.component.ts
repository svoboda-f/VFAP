import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = {
    firstName: 'Filip',
    lastName: 'Svoboda',
    dateOfBirth: '02.11.1999',
    height: '174',
    weight: '80',
    BMI: '26.8',
    BMR: '1700',
  }

  constructor() { }

  ngOnInit(): void {
  }

}
