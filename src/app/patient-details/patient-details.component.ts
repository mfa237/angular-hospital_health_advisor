import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Patient } from 'app/patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patient: Patient;
  id: string;

  constructor(private patientService: PatientService, private route: ActivatedRoute, private afs: AngularFirestore, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
    this.patient = this.patientService.getPatient(this.id);
    console.log('patient name: ' + this.patient.name);
  }

  goBack() {
    this.location.back();
  }

}
