import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddDoctorComponent}  from './add-doctor/add-doctor.component';
import {EditDoctorComponent}  from './edit-doctor/edit-doctor.component';
import {VideoComponent}  from './video/video.component';
import {DoctorComponent}  from './doctor/doctor.component';
import {DoctorDetailsComponent} from './doctor-details/doctor-details.component';
import {AppointmentComponent} from 'app/appointment/appointment.component';
import {AddAppointmentComponent}  from './add-appointment/add-appointment.component';
import {EditAppointmentComponent}  from './edit-appointment/edit-appointment.component';
import {AppointmentDetailsComponent} from './appointment-details/appointment-details.component';

const routes: Routes = [
  { path: 'page', loadChildren: 'app/doctor/doctor.module#DoctorModule' },
  { path: '', loadChildren: 'app/main/main.module#MainModule' },
  { path: 'addDoc', component: AddDoctorComponent },
  { path: 'editDoc/:id', component: EditDoctorComponent },
  { path: 'viewDoc/:id', component: DoctorDetailsComponent },
  { path: 'addApp', component: AddAppointmentComponent },
  { path: 'editApp/:id', component: EditAppointmentComponent },
  { path: 'viewApp/:id', component: AppointmentDetailsComponent },
  { path: 'video', component: VideoComponent },
  { path: 'doctors', component: DoctorComponent },
  { path: 'appointments', component: AppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

