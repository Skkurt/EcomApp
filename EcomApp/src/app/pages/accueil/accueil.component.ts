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
    localStorage.setItem('items', JSON.stringify(cart));

  }
}
