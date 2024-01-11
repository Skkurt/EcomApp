import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  primes = [
    {
      id: 1,
      name: 'CHERRY FREEZE',
      price: '29.99',
      image: 'https://drinkprime.com/cdn/shop/files/CherryFreeze-Front_2_700x.png?v=1703182111',
      inStock: 'true'
    },
    {
      id: 2,
      name: 'GLOWBERRY',
      price: '29.99',
      image: 'https://drinkprime.com/cdn/shop/files/GlowberryFrontRenderUpdated_700x.png?v=1695219959',
      inStock: 'true'
    }
  ]
}
