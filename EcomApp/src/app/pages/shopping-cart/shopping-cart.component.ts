import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prime } from '../../models/prime';
import { Observable, tap } from 'rxjs';
import { ShoppingCart } from '../../models/cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  primes!: Prime[];
  reduceList!: Prime[];

  testArray!: ShoppingCart[];

  totalPrice!: number;
  toDelete!: boolean;

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    const items = localStorage.getItem('items');
    if (items) this.reduceList = JSON.parse(items);

    const test = this.reduceList;
    console.log(items);
    this.primes = this.reduceList;
    this.totalPrice = this.getAllPrices(this.reduceList);

    // this.primes = this.reduceList
    // this.httpClient.get<Prime[]>('http://localhost:3000/items').pipe(
    //   tap(primes => {
    //     this.primes = primes
    //   })
    // ).subscribe()
  }

  getAllPrices(primeList: Prime[]): number {
    const total: number = primeList.reduce(
      (prix, prime) => (prix += prime.price),
      0
    );
    console.log(total);
    return total;
  }
  deleteProduct(id: number) {
    const url = 'http://localhost:3000/items/' + id;
    this.http.delete<Prime>(url).subscribe({
      next: (deletedProduct) => {
        console.log('Produit supprimé avec succès :', deletedProduct);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du produit :', error);
      },
    });
  }
}
