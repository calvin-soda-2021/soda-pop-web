import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StockService} from '../../services/stock.service';

@Component({
  selector: 'app-stock-edit-dialog',
  templateUrl: './stock-edit-dialog.component.html',
  styleUrls: ['./stock-edit-dialog.component.scss']
})
export class StockEditDialogComponent implements OnInit {

  currentStock: number;
  stockOffset: number;
  latestSales: number;
  productName: string;
  productNum: number

  constructor(
    private dialogRef: MatDialogRef<StockEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private db: StockService,
    ) {
    this.currentStock = data.currentStock;
    this.stockOffset = data.stockOffset;
    this.latestSales = data.latestSales;
    this.productName = data.productName;
    this.productNum = data.productNum;
  }

  inputChange(event: any): void {
    this.stockOffset = this.latestSales - event.target.value;

  }

  close(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.db.createStockOffset(this.productNum, this.stockOffset);
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
