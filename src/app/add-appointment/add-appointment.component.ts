import { Component, OnInit } from '@angular/core';
import { Appointment } from 'app/appointment';
import { AppointmentService } from '../appointment.service';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Doctor } from 'app/doctor';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})

export class AddAppointmentComponent implements OnInit {

  doctorColRef: AngularFirestoreCollection<Doctor>;
  doctors: Doctor[] = [];
  doctor: Doctor;
  userId: string;

  appointment: Appointment = {
    id: '',
    description: '',
    patient_id: '',
    patient_name: '',
    doctor_id: '',
    doctor_ic: '',
    doctor_name: '',
    hospital_id: '',
    hospital_name: '',
    date: '',
    time: '', 
    diagnosis_price: 0,
    payment_status: false
  }

  constructor(private afAuth: AngularFireAuth,private afs: AngularFirestore, private appointmentService: AppointmentService, private location: Location) {
    afAuth.authState.subscribe( user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
   

  ngOnInit(): void {
    this.afAuth.authState.subscribe(d => console.log(d));

    this.doctorColRef = this.afs.collection('doctors');
    this.doctorColRef.ref.where('hospital_id', '==', this.userId).get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log('doc.id: ' + doc.id, '=>', doc.data());

        this.doctors.push({
          id : doc.get('id'),
          name: doc.get('name'),
          position: doc.get('position'),
          ic: doc.get('ic'),
          age: doc.get('age'),
          email: doc.get('email'),
          contact_number: doc.get('contact_number'),
          hospital_id : doc.get('hospital_id')
        });

      });
    }).catch(error => {
      console.log(error);
    })

  }

  onSubmit(){
    if(this.appointment.description != '' && this.appointment.patient_name != '' && this.appointment.doctor_name != null && this.appointment.date != '' && this.appointment.time != '') {
      console.log("the doctor is: " + this.appointment.doctor_name);
      this.appointmentService.addAppointment(this.appointment);
    }

    this.location.back();
  }

  back() {
    this.location.back();
  }

}
