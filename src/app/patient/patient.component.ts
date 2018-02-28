import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Patient } from 'app/patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {

  patientColRef: AngularFirestoreCollection<Patient>;
  patients: Patient[] = [];
  userId: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    afAuth.authState.subscribe( user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(d => console.log(d));

    this.patientColRef = this.afs.collection('patients');
    this.patientColRef.ref.where('hospital_id', '==', this.userId).get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log('doc.id: ' + doc.id, '=>', doc.data());

        this.patients.push({
          id : doc.get('id'),
          name: doc.get('name'),
          ic: doc.get('ic'),
          age: doc.get('age'),
          sex: doc.get('sex'),
          hospital_id : doc.get('hospital_id'),
          payment_status : doc.get('payment_status')
        });

      });
    }).catch(error => {
      console.log(error);
    })
  }

}
