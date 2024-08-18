import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CartAppComponent } from './components/cart-app.component';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CartAppComponent, CartComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = '3-cart-app';
}
