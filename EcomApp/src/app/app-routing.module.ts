import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./pages/accueil/accueil.component";
import {ShoppingCartComponent} from "./pages/shopping-cart/shopping-cart.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
