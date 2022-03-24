import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private fs: AngularFirestore) { }

  getStock = () => this.fs.collection('products').snapshotChanges();

  // async getStockForProduct(product: number): {
  //   // get last stock update
  // }

  // getLatestStock = () => this.fs.collection('stock-updates', ref => ref.orderBy('timestamp').limit(1)).get();

  getLatestStock = () => {
    return this.fs.collection('sale-updates', ref => ref.orderBy('timestamp').limit(1)).valueChanges();
  }

  getInStock = () => this.fs.collection('selections').doc('values').valueChanges();

}

export interface Stock {
  product: Product;
  stock: number;
  isSoldOut: boolean;
}

export interface Product {
  id: number;
  name: string;
}

