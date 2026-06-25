import { computed, Injectable, signal } from '@angular/core';
import { Yerba } from '../yerba-list/Yerba';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YerbaCartService {

  private _cartlist: Yerba[] = [];
  cartlist: BehaviorSubject<Yerba[]> = new BehaviorSubject<Yerba[]>(this._cartlist);

  private emitCart() {
    this.cartlist.next([...this._cartlist]);
  }

  addToCart(yerba: Yerba) {
    let item: Yerba | undefined = this._cartlist.find(item => item.id === yerba.id);

    if (item) {
        item.quantity += 1;
        this.addQuantityForYerbaId(item);
    } else {
      yerba.quantity = 1;
      this.addQuantityForYerbaId(yerba);
      this._cartlist.push({... yerba});
    }
    this.emitCart();
  }

  decreaseFromCart(yerba: Yerba) {
    const item = this._cartlist.find(item => item.id === yerba.id);

    if (!item) {return;}

    if (item.quantity > 1) {
      item.quantity--;
      this.decreaseQuantityForYerbaId(item.id);
      this.emitCart();
    } else {
      item.quantity = 0;
      this.removeFromCart(item);
    }

  }

  removeFromCart(yerba: Yerba) {
    this._cartlist = this._cartlist.filter(item => item.id !== yerba.id);
    this.removeQuantityForYerbaId(yerba.id);
    this.emitCart();
  }


  // signañ para actualizacion de quantity/stock en lista de yerbas
  private cartItems = signal<Map<number, number>>(new Map()); // id -> quantity

  private addQuantityForYerbaId(yerba: Yerba) {
    this.cartItems.update(map => {
      const newMap = new Map(map);
      const current = newMap.get(yerba.id) ?? 0;
      newMap.set(yerba.id, current + 1);
      return newMap;
    });
  }

  private decreaseQuantityForYerbaId(yerbaId: number) {
    this.cartItems.update(map => {
      const newMap = new Map(map);
      const current = newMap.get(yerbaId) ?? 0;
      newMap.set(yerbaId, current - 1);
      return newMap;
    });
  }

  private removeQuantityForYerbaId(yerbaId: number) {
    this.cartItems.update(map => {
      const newMap = new Map(map);
      const current = newMap.get(yerbaId) ?? 0;
        newMap.set(yerbaId, 0);
      return newMap;
    });
  }

  // signal de solo lectura para que los componentes consulten quantity
  getQuantity(yerbaId: number) {
    return computed(() => this.cartItems().get(yerbaId) ?? 0);

  }

}
