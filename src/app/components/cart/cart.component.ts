import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  items: CartItem[] = []; // crea variables
  total = 0;

  constructor(
    private sharingDataService: SharingDataService,
    private router: Router
  ) {
    // inicializa variables, reciviendolas
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  onDeleteCart(id: number) {
    // Emite evento usando el servicio
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
