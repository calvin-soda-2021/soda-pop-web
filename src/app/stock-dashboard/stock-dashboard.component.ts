import { Component, OnInit } from '@angular/core';
import {StockService} from '../services/stock.service';
import {Product} from '../interfaces/product.interface';

@Component({
  selector: 'app-stock-dashboard',
  templateUrl: './stock-dashboard.component.html',
  styleUrls: ['./stock-dashboard.component.scss']
})
export class StockDashboardComponent implements OnInit {
  constructor(private db: StockService) { }

  stocks: any;
  tableData: Product[];
  productList: any[];

  // mockStock: Product[] = [
  //   {name: 'Coke', inStock: 'Yes', estimatedStock: 32, price: "$1.75"},
  //   {name: 'New Coke', inStock: 'No', estimatedStock: 0, price: "$1.75"},
  //   {name: 'Vanilla Coke', inStock: 'Yes', estimatedStock: 24, price: "$1.75"},
  //   {name: 'Coke', inStock: 'Yes', estimatedStock: 17, price: "$1.75"},
  //   {name: 'New Coke', inStock: 'No', estimatedStock: 0, price: "$1.75"},
  //   {name: 'Vanilla Coke', inStock: 'Yes', estimatedStock: 52, price: "$1.75"},
  // ];


  ngOnInit(): void {

    this.db.getCurrentProducts().subscribe((product) => {
      this.stocks = product;
      this.productList = Object.entries(this.stocks);

      this.tableData = this.productList.map((p: any): Product => {
        const pIndex = parseInt(p[0]);
        const product = p[1]
        const priceStr: string = product['price']
        const priceFormatted = (parseInt(priceStr)/100).toLocaleString(
          "en-US",
          {style:"currency", currency:"USD"})

        return {
          id: pIndex,
          name: product.name,
          inStock: product['in-stock'],
          estimatedStock: product['in-stock'] ? 'Loading' : 0,
          price: priceFormatted,
        };

      }).filter(p => p.name !== 'NONE');

    });
  }

}
