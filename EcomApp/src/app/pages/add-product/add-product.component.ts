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

  isOffCanvasMenu = false;
  isOffCanvasMenuDialog = false;
  isOffCanvasFiltersMenu = false;
  isOffCanvasFiltersMenuDialog = false;

  isMobileCategoryMenu = false;
  isMobileColorMenu = false;
  isMobileSizeMenu = false;
  menuStates: any = {
    isSortMenu: false,
    isCategoryMenu: false,
    isColorMenu: false,
    isSizeMenu: false,
  }

  clothingSections: Section[] = [
    {
      name: "Women",
      featured: [
        { text: "Sleep", href: "#" },
        { text: "Swimwear", href: "#" },
        { text: "Underwear", href: "#" }
      ],
      categories: [
        { text: "Basic Tees", href: "#" },
        { text: "Artwork Tees", href: "#" },
        { text: "Bottoms", href: "#" },
        { text: "Underwear", href: "#" },
        { text: "Accessories", href: "#" }
      ],
      collection: [
        { text: "Everything", href: "#" },
        { text: "Core", href: "#" },
        { text: "New Arrivals", href: "#" },
        { text: "Sale", href: "#" }
      ],
      brands: [
        { text: "Full Nelson", href: "#" },
        { text: "My Way", href: "#" },
        { text: "Re-Arranged", href: "#" },
        { text: "Counterfeit", href: "#" },
        { text: "Significant Other", href: "#" }
      ],
    },
    {
      name: "Men",
      featured: [
        { text: "Casual", href: "#" },
        { text: "Boxers", href: "#" },
        { text: "Outdoor", href: "#" }
      ],
      categories: [
        { text: "Artwork Tees", href: "#" },
        { text: "Pants", href: "#" },
        { text: "Accessories", href: "#" },
        { text: "Boxers", href: "#" },
        { text: "Basic Tees", href: "#" }
      ],
      collection: [
        { text: "Everything", href: "#" },
        { text: "Core", href: "#" },
        { text: "New Arrivals", href: "#" },
        { text: "Sale", href: "#" }
      ],
      brands: [
        { text: "Significant Other", href: "#" },
        { text: "My Way", href: "#" },
        { text: "Counterfeit", href: "#" },
        { text: "Re-Arranged", href: "#" },
        { text: "Full Nelson", href: "#" }
      ],
    }
  ]
  currentMenu: Section | undefined | null = null;
  currentTab: Section | undefined | null = this.clothingSections[0];
  
  toggleMobileCategoryMenu(){
    this.isMobileCategoryMenu = !this.isMobileCategoryMenu;
  }

  toggleMobileColorMenu(){
    this.isMobileColorMenu = !this.isMobileColorMenu;
  }

  toggleMobileSizeMenu(){
    this.isMobileSizeMenu = !this.isMobileSizeMenu;
  }
  
  toggleOffCanvasFiltersMenu(){
    this.closeMenus();

    this.isOffCanvasFiltersMenu = !this.isOffCanvasFiltersMenu;
    
    if (this.isOffCanvasFiltersMenuDialog){
      setTimeout(() => {
        this.isOffCanvasFiltersMenuDialog = !this.isOffCanvasFiltersMenuDialog;
      },400)
    } else {
      this.isOffCanvasFiltersMenuDialog = !this.isOffCanvasFiltersMenuDialog;
    }
  }

  toggleOffCanvasMenu(){
    this.closeMenus();
    this.isOffCanvasMenu = !this.isOffCanvasMenu;
    
    if (this.isOffCanvasMenuDialog){
      setTimeout(() => {
        this.isOffCanvasMenuDialog = !this.isOffCanvasMenuDialog;
      },400)
    } else {
      this.isOffCanvasMenuDialog = !this.isOffCanvasMenuDialog;
    }
  }

  closeMenus(){
    Object.keys(this.menuStates).forEach( k => {
      this.menuStates[k] = false;
    })
  }
  
  toggleSortMenu(){
    var temp = !this.menuStates.isSortMenu;
    this.closeMenus();
    this.menuStates.isSortMenu = temp;
  }

  toggleCategoryMenu(){
    var temp = !this.menuStates.isCategoryMenu;
    this.closeMenus();
    this.menuStates.isCategoryMenu = temp;
  }

  toggleColorMenu(){
    var temp = !this.menuStates.isColorMenu;
    this.closeMenus();
    this.menuStates.isColorMenu = temp;
  }

  toggleSizeMenu(){
    var temp = !this.menuStates.isSizeMenu;
    this.closeMenus();
    this.menuStates.isSizeMenu = temp;
  }

  selectCategory(category: "Women" | "Men") {
    this.closeMenus();
    if (this.currentMenu?.name === category) {
      this.closeMainMenu();
    } else {
      this.currentMenu = this.clothingSections.find(section => section.name === category)
    }
  }

  selectTab(tab: "Women" | "Men") {
    this.currentTab = this.clothingSections.find(section => section.name === tab)
  }

  get isMenuOpen(){
    return Object.values(this.menuStates).includes(true)
  }

  closeMainMenu(){
    this.currentMenu = null;
  }
}
