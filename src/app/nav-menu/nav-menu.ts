import { Component, EventEmitter, Input, Output } from '@angular/core';
import { YerbaCartService } from '../service-yerba-cart/yerba-cart-service';
import { Yerba } from '../yerba-list/Yerba';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss',
})
export class NavMenu {

  @Input() cartOpen!: boolean;

  @Output() cartDisplayToggle: EventEmitter<void> = new EventEmitter<void>();

  yerbaCartList: Yerba[] = [];
  constructor(private cartService: YerbaCartService) {
    cartService.cartlist.subscribe(cartItem => this.yerbaCartList = cartItem);
  }

  getTotalQuantity() {
    return this.yerbaCartList.reduce((total, item) => total + item.quantity, 0);
  }

  toggleCartDisplay() {
    this.cartDisplayToggle.emit();
  }

}
