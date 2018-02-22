import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Doctor } from 'app/doctor';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  doctor: Doctor;
  id: string;

  constructor(private doctorService: DoctorService, private route: ActivatedRoute, private afs: AngularFirestore, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
    this.doctor = this.doctorService.getDoctor(this.id);
  }

  goBack() {
    this.location.back();
  }

}
