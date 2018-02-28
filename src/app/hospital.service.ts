import { Injectable } from '@angular/core';
import { Hospital } from 'app/hospital';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class HospitalService {

  hospitalColRef: AngularFirestoreCollection<Hospital>;
  hospital: Hospital;

  constructor(private afs: AngularFirestore) { 
    this.hospitalColRef = this.afs.collection('hospitals');
  }

  getHospital(userId: string) {
    this.hospitalColRef.ref.where('id', '==', userId).get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log('hospital name in hospService: ' + doc.get('name'));
        this.hospital = {
          id: doc.get('id'),
          name: doc.get('name'),
          email: doc.get('email'),
          address: doc.get('address'),
          contact_number: doc.get('contact_number'),
          consultation_fee: doc.get('consultation_fee'),
        }
      })
    }).catch(error => {
      console.log('error in hospService: ' + error);
    })

    return this.hospital;
  }

}
