import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { Hospital } from 'app/hospital';
import { HospitalService } from 'app/hospital.service';
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
  data: Hospital;
  hospitalColRef: AngularFirestoreCollection<Hospital>;
  hospName: string;
  hospital: Hospital = {
    id: '',
    name: '',
    email: '',
    address: '',
    contact_number: '',
    consultation_fee: 0
  };

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private hospService: HospitalService) {
    this.hospitalColRef = this.afs.collection('hospitals');
  }

  ngOnInit(): void {
    
    $('div#signup-form').css('display', 'none');
   // $('div#banner').css('display', 'none');

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        $('div#signup-form').css('display', 'inline');
        //this.getAuthState();
        this.authState = auth;

        this.hospitalColRef.ref.where('id', '==', auth.uid).get().then(snapshot => {
          snapshot.forEach(doc => {
            this.data = {
              id: doc.get('id'),
              name: doc.get('name'),
              email: doc.get('email'),
              address: doc.get('address'),
              contact_number: doc.get('contact_number'),
              consultation_fee: doc.get('consultation_fee'),
            }

            this.hospName = this.data.name;

          })
        }).catch(error => {
          console.log(error);
        })

        this.updateUserData();
      } else {
        console.log('not login');
        this.hospName = "";
      }    
      
    });  

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
         // $('div#banner').css('display', 'inline');
        } 
      })
    })

  }

  // getAuthState(){
  //   return this.afAuth.authState.subscribe((auth => {
  //     if(auth) {
  //       console.log('login' + auth);
  //       this.authState = auth;
  //       this.updateUserData();
  //     } else {
  //       console.log('not login');
  //     }    

  //   }))
  // }

  onSubmit() {

    var address = this.state + ", " + this.poscode + ", " + this.city;

    const hospDoc: AngularFirestoreDocument<any> = this.afs.doc(`hospitals/${this.authState.uid}`);

    this.hospital.id = this.authState.uid;
    this.hospital.email = this.authState.email;
    this.hospital.address = address;

    hospDoc.set(this.hospital)
    $('div#signup-form').css('display', 'none');
  }
}