import { Component, HostBinding, Input } from '@angular/core';
import { Yerba } from '../yerba-list/Yerba';
import { YerbaCartService } from '../service-yerba-cart/yerba-cart-service';

@Component({
  selector: 'app-cart-card-yerba',
  imports: [],
  templateUrl: './cart-card-yerba.html',
  styleUrl: './cart-card-yerba.scss',
})
export class CartCardYerba {
  @HostBinding('class') hostClass = 'cart-item';

  @Input()
  yerba!: Yerba;

  constructor(private cartService: YerbaCartService) {}

  decreaseItem() {
    this.cartService.decreaseFromCart(this.yerba);
  }

  removeItem() {
    this.cartService.removeFromCart(this.yerba);
  }
}
