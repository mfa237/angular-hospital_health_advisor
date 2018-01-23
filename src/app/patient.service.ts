import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Patient } from 'app/patient';
import { error } from 'util';
import { UUID } from 'angular2-uuid';

@Injectable()
export class PatientService {

  patientColdRef: AngularFirestoreCollection<Patient>;
  patientDoc: AngularFirestoreDocument<Patient>;
  patient: Patient;
  userId: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 

    this.patientColdRef = this.afs.collection('patients');

    afAuth.authState.subscribe( user => {
      if(user){
        this.userId = user.uid;
      }
    })

  }

  addPatient(patient: Patient){
    this.afAuth.authState.subscribe( user => {
      if(user){
        this.userId = user.uid;
      }
    })

    patient.id = UUID.UUID();
    patient.hospital_id = this.userId;

    this.patientDoc = this.afs.doc<Patient>(`patients/${patient.id}`);

    this.patientDoc.update(patient).then(() => {
      console.log('updated successfully');
    }).catch((error => {
      this.patientDoc.set(patient);
      console.log('added successfully');
    }))
  }

  editPatient(patient: Patient, id: string){
    console.log('doc to be update: ' + id);

    patient.id = id;
    patient.hospital_id = this.userId;

    this.patientDoc = this.afs.doc<Patient>(`patients/${id}`);
    this.patientDoc.update(patient).then(() => {
      console.log('updated successfully');
    }).catch((error => {
      this.patientDoc.set(patient);
      console.log(error);
    }))
  }

  deletePatient(id: string){
    console.log('patient to be deleted: ' + id);
    this.patientDoc = this.afs.doc<Patient>(`patients/${id}`);
    this.patientDoc.delete().then(() => {
      console.log('patient deleted successfully');
    })
  }

  getPatient(patientId: string){

    this.patientColdRef = this.afs.collection('patients');
    this.patientColdRef.ref.where('id', '==', patientId).get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log('doc.id: ' + doc.id, '=>', doc.data());

        this.patient = {
          id : doc.get('id'),
          name: doc.get('name'),
          ic: doc.get('ic'),
          age: doc.get('age'),
          sex: doc.get('sex'),
          hospital_id : doc.get('hospital_id')
        };

      });
    }).catch(error => {
      console.log(error);
    })

    return this.patient;
  }

}
