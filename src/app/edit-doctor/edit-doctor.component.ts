import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Doctor } from 'app/doctor';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})

export class EditDoctorComponent implements OnInit {

  doctorDoc: AngularFirestoreDocument<Doctor>;
  paramId = this.route.snapshot.paramMap.get('id');
  doctor: Doctor;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private doctorService: DoctorService, private location: Location) { }

  ngOnInit() {
    this.doctorDoc = this.afs.doc(`doctors/${this.paramId}`);
    this.doctorDoc.valueChanges().subscribe((doctorRef => {
      if(doctorRef) {

        this.doctor = {
          id : doctorRef.id,
          name : doctorRef.name,
          position : doctorRef.position,
          age : doctorRef.age,
          email : doctorRef.email,
          contact_number : doctorRef.contact_number,
          hospital_id : doctorRef.hospital_id
        };    

      } 
    })) 
  }

  onSubmit() {
    if(this.doctor.name != '' && this.doctor.position != '' && this.doctor.age != null && this.doctor.email != '' && this.doctor.contact_number != '') {
      console.log('paramId : ' + this.paramId);
      this.doctorService.editDoctor(this.doctor, this.paramId);
    }

    this.location.back();
  }

  deleteDoctor() {
    this.doctorService.deleteDoctor(this.paramId);
    this.location.back();
  }


}
