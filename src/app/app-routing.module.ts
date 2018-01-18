import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddDoctorComponent}  from './add-doctor/add-doctor.component';

const routes: Routes = [
  {path: 'page', loadChildren: 'app/doctor/doctor.module#DoctorModule'},
  {path: '', loadChildren: 'app/main/main.module#MainModule'},
  { path: 'add', component: AddDoctorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

