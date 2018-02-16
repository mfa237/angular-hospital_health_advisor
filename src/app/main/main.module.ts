import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {FirebaseUIModule} from 'firebaseui-angular';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: MainComponent},
];

@NgModule({
  imports: [
    CommonModule,
    FirebaseUIModule,
    RouterModule.forChild(routes),
    FormsModule   
  ],
  declarations: [MainComponent]
})
export class MainModule {
}
