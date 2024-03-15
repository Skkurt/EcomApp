import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Prime} from "../../models/prime";
import {tap} from "rxjs";
import {ShoppingCart} from "../../models/cart";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})

export class ShoppingCartComponent implements OnInit{

  primes!: Prime[];
  reduceList!: Prime[];

  testArray!: ShoppingCart[]



  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    const items = localStorage.getItem('items')
    if (items)
      this.reduceList = JSON.parse(items)

    const test = this.reduceList

    console.log(test)
    // this.primes = this.reduceList
    // this.httpClient.get<Prime[]>('http://localhost:3000/items').pipe(
    //   tap(primes => {
    //     this.primes = primes
    //   })
    // ).subscribe()
  }

}
