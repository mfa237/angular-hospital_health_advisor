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

  constructor(private patientService: PatientService, private route: ActivatedRoute, private afs: AngularFirestore, private location: Location) { }

  ngOnInit() {
    this.patient = this.patientService.getPatient(this.route.snapshot.paramMap.get('id'));
    console.log('patient name: ' + this.patient.name);
  }

  goBack() {
    this.location.back();
  }

}
