import {Component, OnInit} from '@angular/core';
import {Cart} from "../../models/cart";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {

  primeList!: Cart[];
  totalPrice = 0;

  ngOnInit(): void {
    const items = localStorage.getItem('filterItem');
    if (items) {
      this.primeList = JSON.parse(items);
    }

    this.totalPrice = this.getAllPrices(this.primeList);
  }


  deleteProduct(cartId: number) {
    const index = this.primeList.findIndex(item => item.cartId === cartId);
    if (index !== -1) {
      this.primeList.splice(index, 1);
    }
    this.totalPrice = this.getAllPrices(this.primeList);

    localStorage.removeItem('filterItem')
    localStorage.setItem('filterItem', JSON.stringify(this.primeList))
    localStorage.removeItem('items')
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
}
