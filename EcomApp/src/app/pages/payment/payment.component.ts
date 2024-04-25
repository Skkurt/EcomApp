import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Prime } from 'src/app/models/prime';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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


  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.fetchCart();
    this.calculTotal();
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
    this.isPopupOpen = true;
    console.log(this.checkoutForm.invalid);
    console.log('Payment done');
  }

  checkout() {
    console.log(this.checkoutForm)
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
  imports: [CommonModule, ReactiveFormsModule] 
})
export class PaymentComponentModule {}