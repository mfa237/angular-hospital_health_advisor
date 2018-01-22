import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { Observable } from 'rxjs/Observable';
import { Hospital } from 'app/hospital';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  authState;


  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.getAuthState();
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

  updateUserData(authState) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`hospitals/${authState.uid}`);

    const data: Hospital = {
      id: authState.uid,
      name: null,
      email: authState.email,
      city : null,
      contact_number : null
    }

    return userRef.set(data)
  }

  getAuthState(){
    return this.afAuth.authState.subscribe((auth => {
      if(auth) {
        console.log('login' + auth);
        this.authState = auth;
        this.updateUserData(this.authState);
      } else {
        console.log('not login');
      }    

    }))
  }
}