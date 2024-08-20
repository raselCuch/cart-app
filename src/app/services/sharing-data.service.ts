import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {
  // comunicar datos entre diferentes componentes usando el 'EventEmitter'
  private _idProductEventEmitter: EventEmitter<number> = new EventEmitter(); // Emite eventos con valor numérico
  private _productEventEmitter: EventEmitter<Product> = new EventEmitter(); // Emite eventos conta un objeto 'Product'

  
  constructor() {}

// permiten subcribirse a los eventos de product e id 
  get productEventEmitter(): EventEmitter<Product> {
    return this._productEventEmitter
  }
  
  get idProductEventEmitter(): EventEmitter<number> {
    return this._idProductEventEmitter;
  }
}
