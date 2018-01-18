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
  doctor: Observable<Doctor>
  userId: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private doctorService: DoctorService) {

    afAuth.authState.subscribe( user => {
      if(user){
        this.userId = user.uid;
      }
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

    this.doctor = this.doctorService.getDoctorList();
  }
    

}
