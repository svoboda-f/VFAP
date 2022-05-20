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
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { NewDiaryEntryDialogComponent } from './components/new-diary-entry-dialog/new-diary-entry-dialog.component';
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import {authInterceptorProviders} from "./auth.interceptor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    CalculatorComponent,
    DiaryComponent,
    AuthDialogComponent,
    ProfileComponent,
    NewDiaryEntryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    HttpClientModule,
    MatIconModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
  ],
  providers: [
    HttpClient,
    authInterceptorProviders,
    MatSnackBar,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
