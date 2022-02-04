import { Injectable } from '@angular/core';
import {AngularFirestore  } from '@angular/fire/firestore';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private fs: AngularFirestore) { }

  getStock = () => this.fs.collection('products').snapshotChanges();
}

