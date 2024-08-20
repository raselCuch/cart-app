import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'catalogo',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalogo.component.html',
})
export class CatalogoComponent implements OnInit {
  products!: Product[];

  constructor(
    private productService: ProductService,
    private sharingDataService: SharingDataService
  ) {
    // if (this.router.getCurrentNavigation()?.extras.state) {
    //   this.products =
    //     this.router.getCurrentNavigation()?.extras.state!['products'];
    // }
  }
  ngOnInit(): void {
    this.products = this.productService.findAll();
  }

  onAddCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
