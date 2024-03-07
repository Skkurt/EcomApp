import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prime } from 'src/app/models/prime';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})

export class ShoppingCartComponent {
  constructor(private http: HttpClient) {}

  products!: Observable<Prime[]>;
  product!: Observable<Prime>;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const url = 'http://localhost:3000/items';
    this.products = this.http.get<Prime[]>(url);
  }

}
