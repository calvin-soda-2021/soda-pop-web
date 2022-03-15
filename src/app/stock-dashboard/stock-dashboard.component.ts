import { Component, OnInit } from '@angular/core';
import {StockService} from '../services/stock.service';

@Component({
  selector: 'app-stock-dashboard',
  templateUrl: './stock-dashboard.component.html',
  styleUrls: ['./stock-dashboard.component.scss']
})
export class StockDashboardComponent implements OnInit {

  constructor(private db: StockService) { }

  stocks: any;
  tableData: any;
  columnsToDisplay: string[] = ['productName', 'inStock', 'estimatedStock'];

  mockStock: {productName: string, inStock: string, estimatedStock: number}[] = [
    {productName: 'Coke', inStock: 'Yes', estimatedStock: 32},
    {productName: 'New Coke', inStock: 'No', estimatedStock: 0},
    {productName: 'Vanilla Coke', inStock: 'Yes', estimatedStock: 24},
    {productName: 'Coke', inStock: 'Yes', estimatedStock: 17},
    {productName: 'New Coke', inStock: 'No', estimatedStock: 0},
    {productName: 'Vanilla Coke', inStock: 'Yes', estimatedStock: 52},
  ];

  ngOnInit(): void {
    this.db.getInStock().subscribe((product) => {
      this.stocks = product;
      const productList = Object.entries(this.stocks);
      this.tableData = productList.map(p => {
        const inStock = p[1]['in-stock'] ? 'Yes' : 'No';
        return {
         productName: p[1]['name'],
         inStock,
         estimatedStock: p[1]['in-stock'] ? 'Coming soon' : 0,
       };
      }).filter(p => p.productName !== 'NONE');
      console.log(this.tableData);
    });
  }

}
