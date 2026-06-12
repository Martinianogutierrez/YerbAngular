import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-yerba-cart',
  imports: [],
  templateUrl: './yerba-cart.html',
  styleUrl: './yerba-cart.scss',
})
export class YerbaCart {
   @HostBinding('class') hostClass = 'shop-column';
}
