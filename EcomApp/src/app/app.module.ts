import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SucessPopUpComponent } from './components/sucess-pop-up/sucess-pop-up.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [

    AppComponent,
    AccueilComponent,
    ShoppingCartComponent,
    AddProductComponent,
    SucessPopUpComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      NgOptimizedImage,
      CommonModule,
      FormsModule
    ],
  providers: [
    SucessPopUpComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
