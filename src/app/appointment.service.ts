import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Doctor } from 'app/doctor';
import { error } from 'util';
import { UUID } from 'angular2-uuid';
import { Appointment } from 'app/appointment';
import { Patient } from 'app/patient';
import { Hospital } from 'app/hospital';

@Injectable()
export class AppointmentService {

  appColRef: AngularFirestoreCollection<Appointment>;
  patientColRef: AngularFirestoreCollection<Patient>;
  doctorColRef: AngularFirestoreCollection<Doctor>;
  hospitalColRef: AngularFirestoreCollection<Hospital>;
  appDoc: AngularFirestoreDocument<Appointment>;
  appointment: Appointment;
  userId: string;  

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    
    this.appColRef = this.afs.collection('appointments');
    this.doctorColRef = this.afs.collection('doctors');
    this.patientColRef = this.afs.collection('patients');
    this.hospitalColRef = this.afs.collection('hospitals');

    afAuth.authState.subscribe( user => {
      if(user){
        this.userId = user.uid;
        console.log('what is the user id: ' + this.userId);
      }
    })
  }

  addAppointment(appointment: Appointment){
    this.afAuth.authState.subscribe( user => {
      if(user){
        this.userId = user.uid;
        console.log('what is the user id: ' + this.userId);
      }
    })

    appointment.id = UUID.UUID();
    appointment.hospital_id = this.userId;

    this.hospitalColRef.ref.where('id', '==', this.userId).get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log('hospital name is: ' + doc.get('name'));
        appointment.hospital_name = doc.get('name');
      })
    })

    this.doctorColRef.ref.where('name', '==', appointment.doctor_name).get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log('doc.id: ' + doc.id, '=>', doc.data());

        appointment.doctor_id = doc.get('id');
      });
    }).catch(error => {
      console.log(error);
    })

    this.patientColRef.ref.where('name', '==', appointment.patient_name).get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log('doc.id: ' + doc.id, '=>', doc.data());

        appointment.patient_id = doc.get('id');

      });
    }).catch(error => {
      console.log(error);
    })

    this.appDoc = this.afs.doc<Appointment>(`appointments/${appointment.id}`);

    this.appDoc.update(appointment).then(() => {
      console.log('updated successfully');
    }).catch((error) => {
      this.appDoc.set(appointment);
      console.log('added successfully');
    })
  }

  editAppointment(appointment: Appointment, id: string){

    appointment.id = id;
    appointment.hospital_id = this.userId;

    this.appDoc = this.afs.doc<Appointment>(`appointments/${id}`);
    this.appDoc.update(appointment).then(() => {
      console.log('updated successfully');
    }).catch((error => {
      this.appDoc.set(appointment);
      console.log(error);
    }))

  }

  deleteAppointment(id: string) {
    console.log('appointment to be deleted: ' + id);
    this.appDoc = this.afs.doc<Appointment>(`appointments/${id}`);
    this.appDoc.delete().then(() => {
      console.log('appointment deleted successfully');
    })
    
  }

  getAppointment(appId: string){

    this.appColRef.ref.where('id', '==', appId).get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log('doc.id: ' + doc.id, '=>', doc.data());

        this.appointment = {
          id : doc.get('id'),
          description: doc.get('description'),
          patient_id: doc.get('patient_id'),
          patient_name: doc.get('patient_name'),
          doctor_id: doc.get('doctor_id'),
          doctor_ic: doc.get('doctor_ic'),
          doctor_name: doc.get('doctor_name'),
          hospital_id: doc.get('hospital_id'),
          hospital_name: doc.get('hospital_name'),
          date: doc.get('date'),
          time : doc.get('time'),
          diagnosis_price : doc.get('diagnosis_price')
        };

      });
    }).catch(error => {
      console.log(error);
    })

    return this.appointment;

  }

}
