import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Appointment } from 'app/appointment';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {

  appointment: Appointment;

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute, private afs: AngularFirestore, private location: Location) { }

  ngOnInit() {
    this.appointment = this.appointmentService.getAppointment(this.route.snapshot.params.get('id'));
    console.log('appointment description: ' + this.appointment.description)
  }

  goBack() {
    this.location.back();
  }

}
