import { Injectable } from '@angular/core';
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
        item.quantity++;
    } else {
      this._cartlist.push({... yerba});
    }
    this.emitCart();
  }

  decreaseFromCart(yerba: Yerba) {
    const item = this._cartlist.find(item => item.id === yerba.id);

    if (!item) {
      return;
    }

    if (item.quantity > 1) {
      item.quantity--;
      this.emitCart();
    } else {
      this.removeFromCart(yerba);
    }

  }

  removeFromCart(yerba: Yerba) {
    this._cartlist = this._cartlist.filter(item => item.id !== yerba.id);
    this.emitCart();
  }

}
