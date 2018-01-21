import {NgModule, enableProdMode} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {FirebaseUIModule} from 'firebaseui-angular';
import {RouterModule, Routes} from '@angular/router';
import { environment } from '../../environments/environment';

const routes: Routes = [
  {path: '', component: MainComponent},
];



@NgModule({
  imports: [
    CommonModule,
    FirebaseUIModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainComponent]
})
export class MainModule {
}
