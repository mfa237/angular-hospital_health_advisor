import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Doctor } from 'app/doctor';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {

  doctor: Doctor = {
    id : '',
    name : '',
    position : '',
    age : null,
    email : '',
    contact_number : '',
    hospital_id : ''
  };

  constructor(private route: ActivatedRoute, private doctorService: DoctorService, private location: Location) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.doctor.name != '' && this.doctor.position != '' && this.doctor.age != null && this.doctor.email != '' && this.doctor.contact_number != '') {
      let paramId = this.route.snapshot.paramMap.get('id');
      console.log('paramId : ' + paramId);
      this.doctorService.editDoctor(this.doctor, paramId);
    }

    this.location.back();
  }

}
