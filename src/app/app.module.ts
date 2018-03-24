import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import {
  AuthMethods,
  AuthProvider,
  AuthProviderWithCustomConfig,
  CredentialHelper,
  FirebaseUIAuthConfig,
  FirebaseUIModule
} from 'firebaseui-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { NavbarModule } from './navbar/navbar.module';
import { DoctorService } from './doctor.service';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { VideoComponent } from './video/video.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { DoctorModule } from 'app/doctor/doctor.module';
import { HomeModule } from 'app/home/home.module';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentService } from './appointment.service';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { PatientComponent } from './patient/patient.component';
import { PatientService } from './patient.service';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { HospitalService } from './hospital.service';
import { WaitingListComponent } from './waiting-list/waiting-list.component';
import { WaitingListService } from './waiting-list.service';

const facebookCustomConfig: AuthProviderWithCustomConfig = {
  provider: AuthProvider.Facebook,
  customConfig: {
    scopes: [
      'public_profile',
      'email',
      'user_likes',
      'user_friends'
    ],
    customParameters: {
      // Forces password re-entry.
      auth_type: 'reauthenticate'
    }
  }
};

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Google,
    AuthProvider.Password,
  ],
  method: AuthMethods.Popup,
  tos: '<your-tos-link>',
  credentialHelper: CredentialHelper.None
};

@NgModule({
  declarations: [
    AppComponent,
    AddDoctorComponent,
    VideoComponent,
    EditDoctorComponent,
    DoctorDetailsComponent,
    AppointmentComponent,
    AddAppointmentComponent,
    EditAppointmentComponent,
    AppointmentDetailsComponent,
    PatientComponent,
    AddPatientComponent,
    EditPatientComponent,
    PatientDetailsComponent,
    WaitingListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    DoctorModule,
    NavbarModule,
    HomeModule
  ],
  providers: [DoctorService, AppointmentService, PatientService, HospitalService, WaitingListService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
