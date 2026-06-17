import { Component, HostBinding } from '@angular/core';
import { CartCardYerba } from '../cart-card-yerba/cart-card-yerba';
import { Yerba } from '../yerba-list/Yerba';
import { YerbaCartService } from '../service-yerba-cart/yerba-cart-service';

@Component({
  selector: 'app-cart-yerba',
  imports: [CartCardYerba],
  templateUrl: './cart-yerba.html',
  styleUrl: './cart-yerba.scss',
})
export class CartYerba {
  @HostBinding('class') hostClass = 'shop-column';

  yerbaCartList: Yerba[] = [];
  constructor(private cartService: YerbaCartService) {
    cartService.cartlist.subscribe(cartItem => this.yerbaCartList = cartItem);
  }

  getTotal() {
    return this.yerbaCartList.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

}
