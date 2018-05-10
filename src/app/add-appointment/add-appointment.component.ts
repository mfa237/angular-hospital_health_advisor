import { Component, OnInit } from '@angular/core';
import { Appointment } from 'app/appointment';
import { AppointmentService } from '../appointment.service';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Doctor } from 'app/doctor';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { WaitingList } from '../waiting_list';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})

export class AddAppointmentComponent implements OnInit {

  //doctorColRef: AngularFirestoreCollection<Doctor>;
  //doctors: Doctor[] = [];
  //doctor: Doctor;
  waitingListDoc: AngularFirestoreDocument<WaitingList>;
  waitingList: WaitingList;
  userId: string;
  paramId = this.route.snapshot.paramMap.get('id');

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

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private route: ActivatedRoute, private appointmentService: AppointmentService, private location: Location) {
    afAuth.authState.subscribe( user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
   
  ngOnInit() {
    this.afAuth.authState.subscribe(d => console.log(d));

    this.waitingListDoc = this.afs.doc(`waiting_list/${this.paramId}`);
    this.waitingListDoc.valueChanges().subscribe((listRef => {
      if(listRef) {
        this.waitingList = {
          id: listRef.id,
          appointment_desc: listRef.appointment_desc,
          patient_name: listRef.patient_name,
          doctor_name: listRef.doctor_name,
          hospital_id: listRef.hospital_id,
          date: listRef.date,
          time: listRef.time
        };
      }
    }))

    // this.doctorColRef = this.afs.collection('doctors');
    // this.doctorColRef.ref.where('hospital_id', '==', this.userId).get().then(snapshot => {
    //   snapshot.forEach(doc => {
    //     console.log('doc.id: ' + doc.id, '=>', doc.data());

    //     this.doctors.push({
    //       id : doc.get('id'),
    //       name: doc.get('name'),
    //       position: doc.get('position'),
    //       ic: doc.get('ic'),
    //       age: doc.get('age'),
    //       email: doc.get('email'),
    //       contact_number: doc.get('contact_number'),
    //       hospital_id : doc.get('hospital_id')
    //     });

    //   });
    // }).catch(error => {
    //   console.log(error);
    // })

  }

  onSubmit(){
    this.appointment.description = this.waitingList.appointment_desc;
    this.appointment.doctor_name = this.waitingList.doctor_name;
    this.appointment.patient_name = this.waitingList.patient_name;
    this.appointment.date = this.waitingList.date;
    this.appointment.time = this.waitingList.time;
    
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
