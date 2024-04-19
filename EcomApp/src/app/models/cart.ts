import {Prime} from "./prime";

export interface Cart extends Prime{
  quantity: number,
  cartId: number
}

export interface ShoppingCart {
  quantity: number,
  items: Prime[]
}
