import {Prime} from "./prime";

export interface Cart {
  id?: number,
  items: Prime
}

export interface ShoppingCart {
  quantity: number,
  items: Prime[]
}
