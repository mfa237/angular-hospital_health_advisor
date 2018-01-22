import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Doctor } from 'app/doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})

export class DoctorComponent implements OnInit {

  doctorColRef: AngularFirestoreCollection<Doctor>;
  doctors: Doctor[] = [];
  doctor: Observable<Doctor>;
  userId: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private doctorService: DoctorService) {

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

  // logout() {
  //   this.afAuth.auth.signOut();
  // }

  successCallback (data: FirebaseUISignInSuccess) {
    console.log(data);
  }

}
