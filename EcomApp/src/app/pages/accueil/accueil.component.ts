import {Component, OnInit} from '@angular/core';
import {Prime} from "../../models/prime";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {Cart} from "../../models/cart";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  primes!: Prime[];


  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    this.httpClient.get<Prime[]>('http://localhost:3000/items').pipe(
      tap(primes => {
        this.primes = primes
      })
    ).subscribe()
  }


  addToCart(prime: Prime) {

    const items = localStorage.getItem('items')
    let cart = [];

    if (items)
      cart = JSON.parse(items);

    cart.push(prime)

    let filterCart = []
    filterCart = this.groupAndCountProducts(cart);

    localStorage.removeItem('filterItem');
    localStorage.setItem('filterItem', JSON.stringify(filterCart));
    localStorage.setItem('items', JSON.stringify(cart));

  }

  groupAndCountProducts(products: Prime[]): Cart[] {
    const groupedProducts: { [title: string]: Cart } = {};

    // Group products by title and count occurrences
    for (const product of products) {
      if (!groupedProducts[product.title]) {
        groupedProducts[product.title] = { ...product, quantity: 0, cartId: Math.floor(Math.random() * 1000) };
      }
      groupedProducts[product.title].quantity++;
    }

    // Convert object back to array
    const result: Cart[] = [];
    for (const title in groupedProducts) {
      result.push(groupedProducts[title]);
    }

    return result;
  }
}
