import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import {map, switchMap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private fs: AngularFirestore) {
  }

  getCurrentProducts = () => this.fs.collection('selections').doc('values').valueChanges();

  getLatestNumSales = (productNum: number) => {
    return this.fs.collection('sale-updates',
      ref => ref
        .where('selection', '==', productNum)
        .orderBy('timestamp', 'desc').limit(1)).valueChanges();
  }

  getLatestStockOffset = (productNum: number) => {
    return this.fs.collection('stock-updates',
        ref => ref
          .where('selection', '==', productNum)
          .orderBy('timestamp', 'desc').limit(1)).valueChanges();
  }

  createStockOffset = (productNum: number, offset: number) => {
    this.fs.collection('stock-updates').add({
      selection: productNum,
      stockOffset: offset,
      timestamp: Date.now(),
      }
    )
  }

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

