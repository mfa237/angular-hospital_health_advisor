import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Patient } from 'app/patient';
import { PatientService } from '../patient.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  patientDoc: AngularFirestoreDocument<Patient>;
  paramId = this.route.snapshot.paramMap.get('id');
  patient: Patient;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private patientService: PatientService, private location: Location) { }

  ngOnInit() {

    this.patientDoc = this.afs.doc(`patients/${this.paramId}`);
    this.patientDoc.valueChanges().subscribe((patientRef => {
      if(patientRef) {

        this.patient = {
          id : patientRef.id,
          name : patientRef.name,
          ic : patientRef.ic,
          age : patientRef.age,
          sex : patientRef.sex,
          hospital_id : patientRef.hospital_id,
          payment_status : patientRef.payment_status
        };    

      } 
    })) 

  }

  onSubmit() {
    if(this.patient.name != '' && this.patient.ic != '' && this.patient.age != null && this.patient.sex != '') {
      console.log('paramId : ' + this.paramId);
      this.patientService.editPatient(this.patient, this.paramId);
    }

    this.location.back();
  }

  deletePatient() {
    this.patientService.deletePatient(this.paramId);
    this.location.back();
  }

  back() {
    this.location.back();
  }

}
