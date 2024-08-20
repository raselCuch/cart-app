import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CatalogoComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = []; // comienza vacio
  total: number = 0;
  // showCart: boolean = false;

  constructor(
    private router: Router,
    private sharingDataService: SharingDataService,
    private service: ProductService
  ) {}

  ngOnInit(): void {
    // obtiene todos los productos del service
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.calculateTotal();
    this.onDeleteCart(); // solo se subcribe. no lo hace ya
    this.onAddCart(); // solo se subcribe. no lo hace ya
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe((product) => {
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
      this.calculateTotal();
      this.saveSession();
      this.router.navigate(['/cart'], {
        state: { items: this.items, total: this.total },
      });
      Swal.fire({
        title: "Shopping cart?",
        text: "Nuevo producto agregado al carro",
        // icon: "question"
        icon: "success"
      });
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe((id) => {
      console.log(id + 'se ha ejecutado el evento'); 

      Swal.fire({
        title: "Esta seguro que desea eliminar?",
        text: "Cuidado el item se elimina del carro de compras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.items = this.items.filter((item) => item.product.id != id);
      if (this.items.length == 0) {
        sessionStorage.removeItem('cart');
      }
      this.calculateTotal();
      this.saveSession();

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/cart'], {
          state: { items: this.items, total: this.total },
        });
      });
          Swal.fire({
            title: "Eliminado!",
            text: "Seha eliminado dle carrito de compras.",
            icon: "success"
          });
        }
      });

      
    });
  }

  calculateTotal(): void {
    this.total = this.items.reduce(
      (accumulator, item) => accumulator + item.quantity * item.product.price,
      0
    );
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items)); // session storage guarda solo string, hay que convertir objeto en string
  }
}
