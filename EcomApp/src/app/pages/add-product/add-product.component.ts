import { Component } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Prime } from 'src/app/models/prime';
import { Observable } from 'rxjs';
=======
import { trigger, transition, style, animate } from '@angular/animations';

interface Section {
  name: "Women" | "Men";
  featured: Link[];
  categories: Link[];
  collection: Link[];
  brands: Link[];
}

interface Link {
  text: string;
  href: string;
}
>>>>>>> 10f6519 (Delete header + footer)

@Component({
  selector: 'app-addproduct',
  templateUrl: './add-product.component.html',
<<<<<<< HEAD
  animations: []
=======
  animations: [ 
    trigger('opacityLong', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease', style({  opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease', style({ opacity: 0 }))
      ])
    ]),
    trigger('translateLeftX', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in-out', style({  transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('opacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({  opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('translateRightX', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in-out', style({  transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('opacityScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.95)' }),
        animate('100ms ease-out', style({  opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' }))
      ])
    ])
  ]
>>>>>>> 10f6519 (Delete header + footer)
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
