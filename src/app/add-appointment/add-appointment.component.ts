import { Component, OnInit } from '@angular/core';
import { Appointment } from 'app/appointment';
import { AppointmentService } from '../appointment.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  appointment: Appointment = {
    id: '',
    description: '',
    patient_id: '',
    patient_name: '',
    doctor_id: '',
    doctor_name: '',
    hospital_id: '',
    date: '',
    time: ''
  }

  constructor(private appointmentService: AppointmentService, private location: Location) { }

  ngOnInit() {

  }

  onSubmit(){
    if(this.appointment.description != '' && this.appointment.patient_name != '' && this.appointment.doctor_name != null && this.appointment.date != '' && this.appointment.time != '') {
      this.appointmentService.addAppointment(this.appointment);
    }

    this.location.back();
  }

}
