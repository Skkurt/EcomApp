import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import { Prime } from 'src/app/models/prime';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  items: any[] = [];
  products: Observable<Prime[]>;
  subtotal: number = 0;
  shipping: number = 10;
  total: number = 0;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchCart();
    this.calculTotal();
  }

  fetchCart() {
    const url = 'http://localhost:3000/shopingCart';
    this.products = this.http.get<any[]>(url).pipe(
      switchMap((res: any[]) => {
        this.items = res;
        const requests = this.items.map(item => this.http.get<Prime>('http://localhost:3000/items/' + item.itemId));
        return forkJoin(requests);
      })
    );
  }  

  calculTotal() {
    this.products.subscribe((res: any) => {
      let total = 0;
      res.forEach((item: any) => {
        total += item.price;
      });
      this.subtotal = total;
      this.total = this.subtotal + this.shipping;
    });
  }

  pay() {
    console.log('Payment done');
  }

  deleteProduct(id: number) {
    const url = 'http://localhost:3000/shopingCart/' + id;
    this.http.delete(url).subscribe(() => {
      this.fetchCart();
      this.calculTotal();
    });
  }

}

  @NgModule({
    declarations: [PaymentComponent],
    imports: [CommonModule] 
  })
  export class PaymentComponentModule {}