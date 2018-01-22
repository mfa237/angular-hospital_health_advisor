import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { HomeComponent } from './home.component';

export const MODULE_ROUTES: Route[] = [
  { path: '', pathMatch: 'full' , component: HomeComponent }
]

export const MODULE_COMPONENTS = [
  HomeComponent
]
