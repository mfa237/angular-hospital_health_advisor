import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Doctor } from 'app/doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})

export class DoctorComponent implements OnInit {

  //doctorDoc: AngularFirestoreDocument<Doctor>;
  doctors: Doctor[];
  userId: string;
  docId: Observable<string>[];

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private doctorService: DoctorService) {

    afAuth.authState.subscribe( user => {
      if(user){
        this.userId = user.uid;
      }
    })

    this.doctorService.getDoctorList().subscribe(doctors => {
      this.doctors = doctors;
    })
    
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(d => console.log(d));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  successCallback(data: FirebaseUISignInSuccess) {
    console.log(data);
  }

  getDoctorList() {

    //console.log('doctor name: ' + this.doctors.length);

    //this.docId = this.doctorService.getDoctorList();
  }
    

}
