import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AppComponent } from 'app/app.component';
import { WaitingList } from 'app/waiting_list';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.css']
})
export class WaitingListComponent implements OnInit {

  waitingListColRef: AngularFirestoreCollection<WaitingList>;
  lists: WaitingList[] = [];
  userId: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    afAuth.authState.subscribe(auth => {
      if (auth) {
        this.userId = auth.uid;
      } 
    });
  }

  ngOnInit() {
    this.waitingListColRef = this.afs.collection('waiting_list');
    this.waitingListColRef.ref.where('hospital_id', '==', this.userId).get().then(snapshot => {
      snapshot.forEach(doc => {

        console.log('waiting list id: ' + doc.get('id'));

        this.lists.push({
          id: doc.get('id'),
          appointment_desc: doc.get('appointment_desc'),
          patient_name: doc.get('patient_name'),
          doctor_name: doc.get('doctor_name'),
          hospital_id: doc.get('hospital_id'),
          date: doc.get('date'),
          time: doc.get('time')
        });
      });
    }).catch(error => {
      console.log(error);
    })
  }

}
