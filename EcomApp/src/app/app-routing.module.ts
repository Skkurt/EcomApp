import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./pages/accueil/accueil.component";
import {ShoppingCartComponent} from "./pages/shopping-cart/shopping-cart.component";
import {AddProductComponent} from "./pages/add-product/add-product.component";
import {PaymentComponent} from "./pages/payment/payment.component";

const routes: Routes = [
  {
    path: '',
    title: 'Accueil',
    component: AccueilComponent
  },
  {
    path: 'cart',
    title: 'Shopping Cart',
    component: ShoppingCartComponent
  },
  {
    path: 'edit',
    title: 'Edit Page',
    component: AddProductComponent
  },
  {
    path: 'payment',
    title: 'Payment',
    component: PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
