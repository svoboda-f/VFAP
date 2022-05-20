import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./components/about/about.component";
import {DiaryComponent} from "./components/diary/diary.component";
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  { path: 'calculator', component: CalculatorComponent},
  { path: 'diary', component: DiaryComponent},
  { path: 'profile', component: ProfileComponent},

  { path: '**', pathMatch: 'full', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
