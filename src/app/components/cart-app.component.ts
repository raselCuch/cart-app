import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CatalogoComponent, CartModalComponent, NavbarComponent],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  products: Product[] = [];
  items: CartItem[] = []; // comienza vacio
  // total: number = 0;
  showCart: boolean = false;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    // obtiene todos los productos del service
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    // this.calculateTotal();
  }

  onAddCart(product: Product) {
    const hasItem = this.items.find((item) => {
      // busca item seleccionado
      return item.product.id === product.id;
    });

    if (hasItem) {
      // si lo
      this.items = this.items.map((item) => {
        if (item.product.id == product.id) {
          // lo vuelve a buscar
          return {
            ...item,
            quantity: item.quantity + 1, // y agrega uno a la cantidad
          };
        }
        return item;
      });
    } else {
      // si no hay lo agrega
      this.items = [...this.items, { product: { ...product }, quantity: 1 }];
    }
    // this.calculateTotal();
    // this.saveSession();
  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter((item) => item.product.id != id);
    if (this.items.length == 0) {
      sessionStorage.removeItem('cart');
    }
    // this.calculateTotal();
    // this.saveSession();
  }

  // calculateTotal(): void {
  //   this.total = this.items.reduce(
  //     (accumulator, item) => accumulator + item.quantity * item.product.price,
  //     0
  //   );
  // }

  // saveSession(): void {
  //   sessionStorage.setItem('cart', JSON.stringify(this.items)); // session storage guarda solo string, hay que convertir objeto en string
  // }

  openCloseCart() {
    this.showCart = !this.showCart;
  }

}
