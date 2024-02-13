import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prime } from 'src/app/models/prime';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addproduct',
  selector: 'app-addproduct',
  templateUrl: './add-product.component.html',
  animations: []
})
export class AddProductComponent {
  products!: Observable<Prime[]>;
  product: any;
  isPopupOpen = false;
  input: HTMLInputElement | null;

  constructor(private http: HttpClient) {
    this.input = document.getElementById('price') as HTMLInputElement | null;
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

    this.products = this.http.get<Prime[]>(url)
  }

  getItemById(id: number) {
    const url = 'http://localhost:3000/items/' + id;

    this.http.get(url).subscribe(
      (response) => {
        this.product = response;
        console.log('Données récupérées avec succès :', this.product);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }

  editProduct(id: number) {
    const url = 'http://localhost:3000/items/' + id;

    var newPrice = this.input?.value;

    this.http.post(url, { price: newPrice }).subscribe(
      (response) => {
        this.fetchData();
        console.log('Produit modifié avec succès :', response);
      },
      (error) => {
        console.error('Erreur lors de la modification du produit :', error);
      }
    );
}

}
