import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Doctor } from 'app/doctor';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})

export class DoctorComponent implements OnInit {

  doctorColRef: AngularFirestoreCollection<Doctor>;
  doctors: Doctor[] = [];
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

    this.doctorColRef = this.afs.collection('doctors');
    this.doctorColRef.ref.where('hospital_id', '==', this.userId).get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log('doc.id: ' + doc.id, '=>', doc.data());

        this.doctors.push({
          id : doc.get('id'),
          name: doc.get('name'),
          position: doc.get('position'),
          ic: doc.get('ic'),
          age: doc.get('age'),
          email: doc.get('email'),
          contact_number: doc.get('contact_number'),
          hospital_id : doc.get('hospital_id')
        });

      });
    }).catch(error => {
      console.log(error);
    })

  }
  
  successCallback (data: FirebaseUISignInSuccess) {
    console.log(data);
  }

}
