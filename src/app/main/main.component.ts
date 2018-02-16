import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { Observable } from 'rxjs/Observable';
import { Hospital } from 'app/hospital';
import { Location } from '@angular/common';
import 'jquery';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  authState;
  state: string;
  poscode: string;
  city: string;
  hospital: Hospital  = {
    id: '',
    name: '',
    email: '',
    address: '',
    contact_number: ''
  };

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private location: Location) {}

  ngOnInit(): void {

    
    $('div#signup-form').css('display', 'none');

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        $('div#signup-form').css('display', 'inline');
        this.getAuthState();
      }
    });   

    

    console.log("user id 2: " + this.authState.uid);
 
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  successCallback(data: FirebaseUISignInSuccess) {
    console.log(data);
  }

  updateUserData() {

    console.log("user id 222:  " + this.authState.uid);
    const hospRef: AngularFirestoreCollection<any> = this.afs.collection(`hospitals`);
    hospRef.ref.where('id', '==', this.authState.uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        if(doc.get('name') != null){
          console.log("hosp name: " + doc.get('name'));
          $('div#signup-form').css('display', 'none');
        } 
      })
    })

   
  }

  getAuthState(){
    return this.afAuth.authState.subscribe((auth => {
      if(auth) {
        console.log('login' + auth);
        this.authState = auth;
        this.updateUserData();
      } else {
        console.log('not login');
      }    

    }))
  }

  onSubmit() {

    var address = this.state + ", " + this.poscode + ", " + this.city;

    const hospDoc: AngularFirestoreDocument<any> = this.afs.doc(`hospitals/${this.authState.uid}`);

    const data: Hospital = {
      id: this.authState.uid,
      name: this.hospital.name,
      email: this.authState.email,
      address: address,
      contact_number : this.hospital.contact_number
    }

    hospDoc.set(data)
    $('div#signup-form').css('display', 'none');
  }
}