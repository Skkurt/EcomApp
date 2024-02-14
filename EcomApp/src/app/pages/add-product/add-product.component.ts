import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prime } from 'src/app/models/prime';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PopupService } from 'src/app/services/pop-up/popup.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './add-product.component.html',
  animations: []
})
export class AddProductComponent {
  products!: Observable<Prime[]>;
  product!: Observable<Prime>;
  isPopupOpen = false;
  isSuccessPopupOpen = false;

  constructor(private http: HttpClient, private popupService: PopupService) {
    this.popupService.popupStatus$.subscribe(status => {
      this.isSuccessPopupOpen = status;
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  openPopup(id: number) {
    this.isPopupOpen = true;
    this.getItemById(id);
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  fetchData() {
    const url = 'http://localhost:3000/items';
    this.products = this.http.get<Prime[]>(url);
  }

  getItemById(id: number) {
    const url = 'http://localhost:3000/items/' + id;
    this.product = this.http.get<Prime>(url);
  }

  editProduct(id: number, newPrice: string) {
    if (newPrice === undefined) {
      console.error('Nouveau prix non défini');
      return;
    }
    
    const url = 'http://localhost:3000/items/' + id;
    this.http.get<Prime>(url).pipe(
      switchMap((product) => {    
        product.price = parseInt(newPrice);   
        return this.http.put<Prime>(url, product);    
      })  
    ).subscribe(
      {
        next: (updatedProduct) => {
          console.log('Produit modifié avec succès :', updatedProduct);
          this.fetchData();
          this.closePopup();
          this.popupService.setMessage('Succès', 'Le produit a été modifié avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la modification du produit :', error);
        }
      }
    );
  }
}