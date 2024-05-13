import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, forkJoin, timeout} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Prime } from 'src/app/models/prime';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Router} from "@angular/router";
import {Cart} from "../../models/cart";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  items: any[] = [];
  products: Observable<Prime[]>;
  product!: Observable<Prime>;
  subtotal: number = 0;
  shipping: number = 10;
  total: number = 0;
  isUpdatePopupOpen = false;
  isPopupOpen: boolean = false;
  checkoutForm: FormGroup;
  checkoutFormSubmitted: boolean = true;
  primeList!: Cart[];


  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.fetchCart();
    // this.calculTotal();
    this.total = this.getAllPrices(this.primeList);
    this.checkoutForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvc: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
  }

  fetchCart() {
    const url = 'http://localhost:3000/shopingCart';

    const items = localStorage.getItem('filterItem');
    if (items) {
      this.primeList = JSON.parse(items);
    }

    // this.products = this.http.get<any[]>(url).pipe(
    //   switchMap((res: any[]) => {
    //     this.items = res;
    //     const requests = this.items.map(item => this.http.get<Prime>('http://localhost:3000/items/' + item.itemId));
    //     return forkJoin(requests);
    //   })
    // );
  }

  getAllPrices(primeList: Cart[]): number {
    return primeList
      .reduce((prix, prime) => {
          const tot = prime.quantity * prime.price
          return prix + tot
        },
        0
      );
  }
  deleteProduct(cartId: number) {
    const index = this.primeList.findIndex(item => item.cartId === cartId);
    if (index !== -1) {
      this.primeList.splice(index, 1);
    }
    this.total = this.getAllPrices(this.primeList);

    localStorage.removeItem('filterItem')
    localStorage.setItem('filterItem', JSON.stringify(this.primeList))
    localStorage.removeItem('items')
  }

  pay() {
    this.isPopupOpen = true;
    localStorage.removeItem('filterItem')
    localStorage.removeItem('items')
    console.log(this.checkoutForm.invalid);
    console.log('Payment done');
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 5000)

  }

}


@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class PaymentComponentModule {}
