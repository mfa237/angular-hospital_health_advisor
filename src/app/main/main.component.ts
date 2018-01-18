import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  //user: Observable<User>;
  authState;


  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    // this.user = this.afAuth.authState.switchMap(user => {
    //   if(user) {
    //     return this.afs.doc<User>('users/${user.id}').valueChanges()
    //   } else {
    //     return Observable.of(null)
    //   }
    // })
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
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`hospitals/${authState.uid}/hospital_data/hospital_details`);

    const data: Hospital = {
      uid: authState.uid,
      email: authState.email
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

interface Hospital {
  uid: string;
  email: string;
}
