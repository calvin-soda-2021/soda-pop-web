import {Component, Input, OnInit} from '@angular/core';
import {combineLatestWith} from 'rxjs';
import {StockService} from '../../services/stock.service';
import {Product} from '../../interfaces/product.interface';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {StockEditDialogComponent} from '../stock-edit-dialog/stock-edit-dialog.component';

@Component({
  selector: 'admin-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss']
})
export class ProductRowComponent implements OnInit {
  @Input() product: Product;

  constructor(private db: StockService, private dialog: MatDialog) {
  }

  totalSales: number;
  stockOffset: number;
  stockString: string;

  ngOnInit(): void {

    const sale$ = this.db.getLatestNumSales(this.product.id);
    const stock$ = this.db.getLatestStockOffset(this.product.id);

    sale$.pipe(
      combineLatestWith(stock$)
    ).subscribe(([sales, stockOffset]: [any[], any[]]) => {
      this.totalSales = parseInt(sales[0]['total-sales']);
      this.stockOffset = parseInt(stockOffset[0].stockOffset);
      this.product.estimatedStock = this.totalSales - this.stockOffset;
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      currentStock: this.product.estimatedStock,
      stockOffset: this.stockOffset,
      latestSales: this.totalSales,
      productName: this.product.name,
      productNum: this.product.id,
    }
    const dialogRef = this.dialog.open(StockEditDialogComponent, dialogConfig);

  }
}
