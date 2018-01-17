import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'page', loadChildren: 'app/doctor/doctor.module#DoctorModule'},
  {path: '', loadChildren: 'app/main/main.module#MainModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

