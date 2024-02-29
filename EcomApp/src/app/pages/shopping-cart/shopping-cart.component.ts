import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})

export class ShoppingCartComponent {
  constructor(private http: HttpClient) {}


  ngOnInit(): void {

  }

}
