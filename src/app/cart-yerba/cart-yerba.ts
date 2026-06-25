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
mostrar() {
console.log("se muestran las yerbas")
}
  @HostBinding('class') hostClass = 'shop-column';

  yerbaCartList: Yerba[] = [];

  constructor(private cartService: YerbaCartService) {
    this.cartService.cartlist.subscribe(cartItem => this.yerbaCartList = cartItem);
  }

  onYerbaDecreased(decreasedYerba: Yerba) {
    console.log('Decreasing yerba in cart:', decreasedYerba);
    this.cartService.decreaseFromCart(decreasedYerba);
  }
 
  onYerbaRemoved(removedYerba: Yerba) {
    console.log('Removing yerba from cart:', removedYerba);
    this.cartService.removeFromCart(removedYerba);
  }

  getTotalPrice() {
    return this.yerbaCartList.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getTotalQuantity() {
    return this.yerbaCartList.reduce((total, item) => total + item.quantity, 0);
  }

}
