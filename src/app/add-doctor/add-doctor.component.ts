import { Component, OnInit } from '@angular/core';
import { Doctor } from 'app/doctor';
import { DoctorService } from '../doctor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})


export class AddDoctorComponent implements OnInit {

  doctor: Doctor = {
    id : '',
    name : '',
    position : '',
    age : null,
    email : '',
    contact_number : '',
    hospital_id : ''
  };

  constructor(private doctorService: DoctorService, private location: Location) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.doctor.name != '' && this.doctor.position != '' && this.doctor.age != null && this.doctor.email != '' && this.doctor.contact_number != '') {
      this.doctorService.addDoctor(this.doctor);
    }

    this.location.back();
  }

}
