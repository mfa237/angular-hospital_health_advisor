import { Component, OnInit } from '@angular/core';
import { Patient } from 'app/patient';
import { PatientService } from '../patient.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})


export class AddPatientComponent implements OnInit {

  patient: Patient = {
    id : '',
    name : '',
    ic : '',
    age : null,
    sex : '',
    hospital_id : '',
    payment_status : true
  };

  constructor(private patientService: PatientService, private location: Location) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.patient.name != '' && this.patient.ic != '' && this.patient.age != null && this.patient.sex != '') {
      this.patientService.addPatient(this.patient);
    }

    this.location.back();
  }
  
  back() {
    this.location.back();
  }


}
