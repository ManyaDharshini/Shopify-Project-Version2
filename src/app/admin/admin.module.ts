import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './adminDashboard/adminDashboard.component';
import { AdminNavbarComponent } from './adminNavbar/adminNavbar.component';
import { UsersComponent } from './users/users.component';
import { AddProductsComponent } from './add-products/add-products.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    UsersComponent,
    AddProductsComponent
  ]
})
export class AdminModule { }