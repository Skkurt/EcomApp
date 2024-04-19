import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Prime} from '../../models/prime';
import {Cart, ShoppingCart} from '../../models/cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  primes!: Prime[];
  reduceList!: Cart[];

  testArray!: ShoppingCart[];

  totalPrice!: number;
  toDelete!: boolean;

  constructor(private readonly http: HttpClient) {
  }

  ngOnInit() {
    const items = localStorage.getItem('items');
    if (items) this.reduceList = JSON.parse(items);

    const test = this.reduceList;

    // this.primes = this.reduceList;
    this.reduceList = this.trierEtCompter(this.primes);
    this.totalPrice = this.getAllPrices(this.reduceList);
    console.log(this.reduceList)
  }

  trierEtCompter(liste: Prime[]): any[] {
    const counts: { [title: string]: number } = {};
    liste.forEach(objet => {
      const titre = objet.title;
      if (counts[titre]) {
        counts[titre]++;
      } else {
        counts[titre] = 1;
      }
    });

    const triee: Cart[] = [];
    for (const titre in counts) {
      triee.push({
        ...liste.find(item => item.title === titre)!,
        quantity: counts[titre],
        cartId: Math.floor(Math.random() * 1000)
      });
    }

    return triee;
  }

  getAllPrices(primeList: Cart[]): number {
    const total: number = primeList
      .reduce((prix, prime) => {
          const tot = prime.quantity * prime.price
          return prix + tot
        },
        0
      );
    console.log(total);
    return total;
  }

  deleteProduct(id: number) {
    console.log(this.reduceList)
    const liste = this.reduceList.filter((prime) => {
      console.log(prime)
      return prime.cartId != id
    });

    console.log(liste)

    this.reduceList = liste
  }
}
