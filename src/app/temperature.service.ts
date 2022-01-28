import { query } from '@angular/animations';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private fs: AngularFirestore) { }

  // READ all temperatures
  getAllTemps() {
    return this.fs.collection<Temperature>('temperatures').snapshotChanges().pipe(
      map(actions => {
        return actions.map(p => {
          const list = p.payload.doc;
          const id = list.id;
          return { id, ...list.data() as Temperature };
        });
      })
    )
  }

}

export interface Temperature {
  id?: string;
  temperature: number;
  timestamp: Date;
}



