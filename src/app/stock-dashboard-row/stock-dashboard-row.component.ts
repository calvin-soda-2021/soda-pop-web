import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../interfaces/product.interface';
import {StockService} from '../services/stock.service';
import {combineLatestWith} from 'rxjs';

@Component({
  selector: 'app-stock-dashboard-row',
  templateUrl: './stock-dashboard-row.component.html',
  styleUrls: ['./stock-dashboard-row.component.scss']
})
export class StockDashboardRowComponent implements OnInit {
  @Input() product: Product

  constructor(private db: StockService) { }

  totalSales: number;
  stockOffset: number;
  stockString: string;

  OVERRIDE_OUT_OF_STOCK: boolean = false;



  ngOnInit(): void {
    // for dev work. overrides the inStock prop on product to force calculation of what it thinks is in stock
    // this.OVERRIDE_OUT_OF_STOCK = true;

    const sale$ = this.db.getLatestNumSales(this.product.id)
    const stock$ = this.db.getLatestStockOffset(this.product.id)

    if (this.product.inStock || this.OVERRIDE_OUT_OF_STOCK) {
      sale$.pipe(
        combineLatestWith(stock$)
      ).subscribe(([sales, stockOffset]: [any[], any[]]) => {
        this.totalSales = parseInt(sales[0]["total-sales"]);
        this.stockOffset = parseInt(stockOffset[0].stockOffset);
        this.product.estimatedStock = this.totalSales - this.stockOffset;
        this.stockString = `Around ${this.product.estimatedStock} in stock`;
      })
    } else {
      this.stockString = "Out of stock";
    }

  }

}
