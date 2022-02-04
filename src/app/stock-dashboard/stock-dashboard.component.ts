import { Component, OnInit } from '@angular/core';
import {StockService} from '../stock.service';

@Component({
  selector: 'app-stock-dashboard',
  templateUrl: './stock-dashboard.component.html',
  styleUrls: ['./stock-dashboard.component.scss']
})
export class StockDashboardComponent implements OnInit {

  constructor(private db: StockService) { }

  stocks: any

  ngOnInit(): void {
    this.db.getStock().subscribe((stock) => {
      this.stocks = stock;
      console.log(this.stocks);
    });
  }

}
