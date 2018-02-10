import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Appointment } from 'app/appointment';
import { AppointmentService } from '../appointment.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {

  appDoc: AngularFirestoreDocument<Appointment>;
  paramId = this.route.snapshot.paramMap.get('id');
  appointment: Appointment;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private appointmentService: AppointmentService, private location: Location) { }

  ngOnInit() {

    this.appDoc = this.afs.doc(`appointments/${this.paramId}`);
    this.appDoc.valueChanges().subscribe((appRef => {
      if(appRef) {

        this.appointment = {
          id : appRef.id,
          description : appRef.description,
          patient_id : appRef.patient_id,
          patient_name : appRef.patient_name,
          doctor_id : appRef.doctor_id,
          doctor_ic : appRef.doctor_ic,
          doctor_name : appRef.doctor_name,
          hospital_id : appRef.hospital_id,
          date : appRef.date,
          time : appRef.time
        };    

      } 
    })) 

  }

  onSubmit() {
    if(this.appointment.description != '' && this.appointment.patient_name != '' && this.appointment.doctor_name != null && this.appointment.date != '' && this.appointment.time != '') {
      console.log('paramId : ' + this.paramId);
      this.appointmentService.editAppointment(this.appointment, this.paramId);
    }

    this.location.back();
  }

  deleteAppointment() {
    this.appointmentService.deleteAppointment(this.paramId);
    this.location.back();
  }

  back() {
    this.location.back();
  }

}
