import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { AboutComponent } from './components/about/about.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { DiaryComponent } from './components/diary/diary.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    CalculatorComponent,
    DiaryComponent,
    AuthDialogComponent,
    ProfileComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
