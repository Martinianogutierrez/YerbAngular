import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { YerbaCartService } from '../service-yerba-cart/yerba-cart-service';
import { Yerba } from '../yerba-list/Yerba';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss',
})
export class NavMenu {
  yerbaCartList: Yerba[] = [];
  constructor(private cartService: YerbaCartService) {
    cartService.cartlist.subscribe(cartItem => this.yerbaCartList = cartItem);
  }

  getTotalQuantity() {
    return this.yerbaCartList.reduce((total, item) => total + item.quantity, 0);
  }
}
