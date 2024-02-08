import {Component} from '@angular/core';
import {Prime} from "../../models/prime";
import {Cart} from "../../models/cart";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {


  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  primes = this.httpClient.get<Prime[]>('http://localhost:3000/items')
  primes1: Prime[] = [
    {
      id: 1,
      title: "Prime 1",
      description: 'Description 1',
      price: 4,
      image: "https://www.unitedsweets.co.nz/cdn/shop/files/2a_1024x1024.png?v=1693549862"
    },
    {
      id: 2,
      title: "Prime 2",
      description: 'Description 2',
      price: 4,
      image: "https://www.unitedsweets.co.nz/cdn/shop/files/PrimeStrawberry_1024x1024.png?v=1700984118"
    },
    {
      id: 3,
      title: "Prime 3",
      description: 'Description 3',
      price: 6,
      image: "https://www.sportsdirect.com/images/imgzoom/71/71065903_xxl.jpg"
    },
    {
      id: 4,
      title: "Prime 4",
      description: 'Description 4',
      price: 4,
      image: "https://i.ebayimg.com/images/g/CtIAAOSwXoBkZLUo/s-l1600.jpg"
    }
  ]

  cartList: Cart[] = []


  addToCart(prime: Prime) {
    const newCart: Cart = {id: parseInt((Math.random()*10000).toString()), items: prime}

    let items = localStorage.getItem('items')

    if (items) {
      this.cartList = JSON.parse(items)
    }

    this.cartList.push(newCart)

    localStorage.setItem('items', JSON.stringify(this.cartList))
  }
}
