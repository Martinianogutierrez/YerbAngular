import { Component, HostBinding, Input } from '@angular/core';
import { Yerba } from '../yerba-list/Yerba';

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
}
