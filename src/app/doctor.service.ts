import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Doctor } from 'app/doctor';
import { error } from 'util';

@Injectable()
export class DoctorService {

  doctorDoc: AngularFirestoreDocument<Doctor>;
  doctorCol: AngularFirestoreCollection<Doctor>;
  doctors: Observable<Doctor[]>
  doctor: Observable<Doctor>
  userId: string;
  docIds: string[] = [];
  docId: Observable<string>;

  

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 

    afAuth.authState.subscribe( user => {
      if(user){
        this.userId = user.uid;
      }
    })

    this.doctorCol = this.afs.collection<Doctor>(`hospitals/${this.userId}/doctors/doctor_data/doc_details`);
    this.doctors = this.doctorCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Doctor;
        //this.docIds.push(this.docId);
        
        return data;

      });
    });

  }

  getDoctorList() {

    return this.doctors;
    

    



    // const doctorName = 'david';    
    // this.doctorDoc = this.afs.doc<Doctor>(`hospitals/${this.userId}/doctors/${doctorName}/doctor_data/doctor_details`);
    // this.doctor = this.doctorDoc.valueChanges();

    //return this.doctors;
  }

  addDoctor(doctor: Doctor) {
    this.afAuth.authState.subscribe( user => {
      if(user){
        this.userId = user.uid;
      }
    })

    const doctorName = 'zz';    
    this.doctorDoc = this.afs.doc<Doctor>(`hospitals/${this.userId}/doctors/${doctor.name}/doctor_data/doctor_details`);

    this.doctorDoc.update(doctor).then(() => {
      console.log('update successfully');
    }).catch((error => {
      this.doctorDoc.set(doctor);
      console.log('added successfully');
    }))
   
    // if(???) {
    //   this.doctorDoc.update(doctor);
    // } else {
    //   this.doctorDoc.set(doctor);
    // }
    

  }

  getUserId() {
    return this.userId;
  }

}
