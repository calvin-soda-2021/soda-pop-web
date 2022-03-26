import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {StockService} from '../services/stock.service';
import {Product} from '../interfaces/product.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private db: StockService,
    ) { }

  stocks: any;
  tableData: Product[];
  productList: any[];

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

  logout(): void {
    this.authService
      .logout()
      .then(this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }

}
