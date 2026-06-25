import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Yerba } from '../yerba-list/Yerba';

@Component({
  selector: 'app-cart-card-yerba',
  imports: [],
  templateUrl: './cart-card-yerba.html',
  styleUrl: './cart-card-yerba.scss',
})
export class CartCardYerba {
  @HostBinding('class') hostClass = 'cart-item';

  @Input() yerba!: Yerba;
  
  @Output() yerbaDecreased: EventEmitter<Yerba> = new EventEmitter<Yerba>();

  @Output() yerbaRemoved: EventEmitter<Yerba> = new EventEmitter<Yerba>();

  constructor() {}

  decreaseItem() {
    this.yerbaDecreased.emit(this.yerba);
  }

  removeItem() {
    this.yerbaRemoved.emit(this.yerba);
  }
}
