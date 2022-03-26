import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { ProductRowComponent } from './product-row/product-row.component';
import {MatInputModule} from '@angular/material/input';
import { StockEditDialogComponent } from './stock-edit-dialog/stock-edit-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [
    AdminComponent,
    ProductRowComponent,
    StockEditDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
  ]
})
export class AdminModule { }
