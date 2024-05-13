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
  isUpdatePopupOpen = false;
  isAddPopupOpen = false;
  isDeletePopupOpen = false;
  isSuccessPopupOpen = false;

  constructor(private http: HttpClient, private popupService: PopupService) {
    this.popupService.popupStatus$.subscribe(status => {
      this.isSuccessPopupOpen = status;
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  openUpdatePopup(id: number) {
    this.isUpdatePopupOpen = true;
    this.getItemById(id);
  }

  closeUpdatePopup() {
    this.isUpdatePopupOpen = false;
  }

  openAddPopup() {
    this.isAddPopupOpen = true;
  }

  closeAddPopup() {
    this.isAddPopupOpen = false;
  }

  openDeletePopup() {
    this.isDeletePopupOpen = true;
  }

  closeDeletePopup() {
    this.isDeletePopupOpen = false;
    this.isUpdatePopupOpen = true;
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
          this.closeUpdatePopup();
          this.popupService.setMessage('Succès', 'Le produit a été modifié avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la modification du produit :', error);
        }
      }
    );
  }

  addProduct(title: string, description: string, price: string, image: string) {
    if (!title || !description || !price || !image) {
      console.error('Titre, description, prix ou image non défini');
      return;
    }

    const url = 'http://localhost:3000/items';
    const product = {
      title,
      description,
      price: parseInt(price),
      image
    };
    this.http.post<Prime>(url, product).subscribe(
      {
        next: (newProduct) => {
          console.log('Produit ajouté avec succès :', newProduct);
          this.fetchData();
          this.closeAddPopup();
          this.popupService.setMessage('Succès', 'Le produit a été ajouté avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du produit :', error);
        }
      }
    );
  }

  deleteProduct(id: number) {
    const url = 'http://localhost:3000/items/' + id;
    this.http.delete<Prime>(url).subscribe(
      {
        next: (deletedProduct) => {
          console.log('Produit supprimé avec succès :', deletedProduct);
          this.fetchData();
          this.closeDeletePopup();
          this.closeUpdatePopup();
          this.popupService.setMessage('Succès', 'Le produit a été supprimé avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du produit :', error);
        }
      }
    );
  }
}