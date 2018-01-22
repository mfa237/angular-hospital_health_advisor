import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DoctorComponent} from './doctor.component';
import {FirebaseUIModule} from 'firebaseui-angular';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'doctors', component: DoctorComponent},
];


@NgModule({
  imports: [
    CommonModule,
    FirebaseUIModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DoctorComponent]
})
export class DoctorModule {
}
