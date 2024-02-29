import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AddProductComponent } from './pages/add-product/add-product.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ShoppingCartComponent,
    AddProductComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
