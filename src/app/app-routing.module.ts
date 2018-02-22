import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctorComponent }  from './add-doctor/add-doctor.component';
import { EditDoctorComponent }  from './edit-doctor/edit-doctor.component';
import { VideoComponent }  from './video/video.component';
import { DoctorComponent }  from './doctor/doctor.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { AppointmentComponent } from 'app/appointment/appointment.component';
import { AddAppointmentComponent }  from './add-appointment/add-appointment.component';
import { EditAppointmentComponent }  from './edit-appointment/edit-appointment.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AddPatientComponent } from 'app/add-patient/add-patient.component';
import { EditPatientComponent } from 'app/edit-patient/edit-patient.component';
import { PatientDetailsComponent } from 'app/patient-details/patient-details.component';
import { PatientComponent } from 'app/patient/patient.component';

const routes: Routes = [
  { path: 'page', loadChildren: 'app/doctor/doctor.module#DoctorModule' },
  { path: '', loadChildren: 'app/main/main.module#MainModule' },
  { path: 'addDoc', component: AddDoctorComponent },
  { path: 'editDoc/:id', component: EditDoctorComponent },
  { path: 'viewDoc/:id', component: DoctorDetailsComponent },
  { path: 'addApp', component: AddAppointmentComponent },
  { path: 'editApp/:id', component: EditAppointmentComponent },
  { path: 'viewApp/:id', component: AppointmentDetailsComponent },
  { path: 'addPatient', component: AddPatientComponent },
  { path: 'editPatient/:id', component: EditPatientComponent },
  { path: 'viewPatient/:id', component: PatientDetailsComponent },
  { path: 'video', component: VideoComponent },
  { path: 'doctors', component: DoctorComponent },
  { path: 'appointments', component: AppointmentComponent},
  { path: 'patients', component: PatientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}

