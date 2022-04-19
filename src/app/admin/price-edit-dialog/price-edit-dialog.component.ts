import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-price-edit-dialog',
  templateUrl: './price-edit-dialog.component.html',
  styleUrls: ['./price-edit-dialog.component.scss']
})
export class PriceEditDialogComponent implements OnInit {

  productNum: number;
  productName: string;
  currentPrice: number;
  priceInput: string;

  constructor(
    private dialogRef:MatDialogRef<PriceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.productName = data.productName;
    this.productNum = data.productNum;
    this.currentPrice = parseFloat(data.currentPrice.slice(1));
  }

  inputChange(event: any): void {
    this.priceInput = event.target.value;
  }

  close(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    // TODO: add logic to update price
    console.log(`Simulated price update to ${parseFloat(this.priceInput) * 100000 / 1000} cents`)
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
