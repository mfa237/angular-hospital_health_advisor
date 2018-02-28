import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Hospital } from 'app/hospital';
import { HospitalService } from '../hospital.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'jquery';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public menuItems: any[];
  public brandMenu: any;
  isCollapsed = true; 
  hospital: Hospital;
  hospitalColRef: AngularFirestoreCollection<Hospital>;
  hospName: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.hospitalColRef = this.afs.collection('hospitals');

    afAuth.authState.subscribe( user => {
      if(user){

        this.hospitalColRef.ref.where('id', '==', user.uid).get().then(snapshot => {
          snapshot.forEach(doc => {
            this.hospital = {
              id: doc.get('id'),
              name: doc.get('name'),
              email: doc.get('email'),
              address: doc.get('address'),
              contact_number: doc.get('contact_number'),
              consultation_fee: doc.get('consultation_fee'),
            }

            this.hospName = this.hospital.name;

          })
        }).catch(error => {
          console.log(error);
        })
        
      } else {
        this.hospName = "";
      }
    })
   }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
    $('div#signup-form').css('display', 'none');
  }

}
