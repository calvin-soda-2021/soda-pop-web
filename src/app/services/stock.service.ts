import { Injectable } from '@angular/core';
import {AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private fs: AngularFirestore) { }

  getStock = () => this.fs.collection('products').snapshotChanges();

  // async getStockForProduct(product: number): Promise<Stock> {
  //   // get last stock update
  //   const stock_updates = await this.fs.collection('stock-updates').get().orderBy
  // }

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

