import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Doctor } from 'app/doctor';
import { error } from 'util';
import { UUID } from 'angular2-uuid';

@Injectable()
export class DoctorService {

  doctorColRef: AngularFirestoreCollection<Doctor>;
  doctorDoc: AngularFirestoreDocument<Doctor>;
  doctor: Doctor;
  userId: string;  
  //doctorId: string;
  type: string;
  todo$: Observable<Doctor[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 

    this.doctorColRef = this.afs.collection('doctors');

    afAuth.authState.subscribe( user => {
      if(user){
        this.userId = user.uid;
      }
    })

    this.todo$ = this.doctorColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Doctor;
        const id = action.payload.doc.id;
        return { id, ...data };
      })
    })

  }

  addDoctor(doctor: Doctor) {
    this.afAuth.authState.subscribe( user => {
      if(user){
        this.userId = user.uid;
      }
    })

    doctor.id = UUID.UUID();
    doctor.hospital_id = this.userId;

    this.doctorDoc = this.afs.doc<Doctor>(`doctors/${doctor.id}`);

    this.doctorDoc.update(doctor).then(() => {
      console.log('updated successfully');
    }).catch((error => {
      this.doctorDoc.set(doctor);
      console.log('added successfully');
    }))

  }

  editDoctor(doctor: Doctor, id: string) {
    console.log('doc to be update: ' + id);

    doctor.id = id;
    doctor.hospital_id = this.userId;

    this.doctorDoc = this.afs.doc<Doctor>(`doctors/${id}`);
    this.doctorDoc.update(doctor).then(() => {
      console.log('updated successfully');
    }).catch((error => {
      this.doctorDoc.set(doctor);
      console.log(error);
    }))
  }

  // getUserId() {
  //   return this.userId;
  // }

  deleteDoctor(id: string) {
    console.log('doctor to be deleted: ' + id);
    this.doctorDoc = this.afs.doc<Doctor>(`doctors/${id}`);
    this.doctorDoc.delete().then(() => {
      console.log('doctor deleted successfully');
    })
    
  }

  getDoctor(doctorId: string){

    this.doctorColRef = this.afs.collection('doctors');
    this.doctorColRef.ref.where('id', '==', doctorId).get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log('doc.id: ' + doc.id, '=>', doc.data());

        this.doctor = {
          id : doc.get('id'),
          name: doc.get('name'),
          position: doc.get('position'),
          ic: doc.get('ic'),
          age: doc.get('age'),
          email: doc.get('email'),
          contact_number: doc.get('contact_number'),
          hospital_id : doc.get('hospital_id')
        };

      });
    }).catch(error => {
      console.log(error);
    })

    return this.doctor;
    
  }

}
