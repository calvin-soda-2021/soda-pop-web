import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private fs: AngularFirestore) { }

  // // READ all temperatures
  // getAllTemps = () => this.fs.collection<Temperature>('temperatures').snapshotChanges().pipe(
  //   map(actions => {
  //     return actions.map(p => {
  //       const list = p.payload.doc;
  //       const id = list.id;
  //       return {id, ...list.data() as Temperature};
  //     });
  //   })
  // )
  getTemps = () => this.fs.collection('temperatures').snapshotChanges();

}

export interface Temperature {
  id?: string;
  temperature: number;
  timestamp: Timestamp;
}



