import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Appointment } from 'app/appointment';
import { AppointmentService } from '../appointment.service';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {

  appColRef: AngularFirestoreCollection<AppComponent>;
  appointments: Appointment[] = [];
  appointment: Observable<Appointment>;
  userId: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private appointmentService: AppointmentService) {
    afAuth.authState.subscribe( user => {
      if (user) {
        this.userId = user.uid;
      }
    });
   }

  ngOnInit() {
    this.appColRef = this.afs.collection('appointments');
    this.appColRef.ref.where('hospital_id', '==', this.userId).get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log('doc.id: ' + doc.id, '=>', doc.data());

        this.appointments.push({
          id : doc.get('id'),
          description: doc.get('description'),
          patient_id: doc.get('patient_id'),
          patient_name: doc.get('patient_name'),
          doctor_id: doc.get('doctor_id'),
          doctor_ic: doc.get('doctor_ic'),
          doctor_name: doc.get('doctor_name'),
          hospital_id: doc.get('hospital_id'),
          date: doc.get('date'),
          time : doc.get('time')
        });

      });
    }).catch(error => {
      console.log(error);
    })
  }

}
