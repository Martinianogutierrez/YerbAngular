import { Injectable } from '@angular/core';
import { Yerba } from '../yerba-list/Yerba';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YerbaCartService {

  private _cartlist: Yerba[] = [];
  cartlist: BehaviorSubject<Yerba[]> = new BehaviorSubject<Yerba[]>(this._cartlist);

  addToCart(yerba: Yerba) {
    let item: Yerba | undefined = this._cartlist.find(item => item.id === yerba.id);
    if (item) {
        item.quantity++;
    } else {
      this._cartlist.push({... yerba});
    }
    console.log(this._cartlist);
  }

}
