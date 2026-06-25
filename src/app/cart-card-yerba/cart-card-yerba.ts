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
    console.log('Decreasing item:', this.yerba);
    this.yerbaDecreased.emit(this.yerba);
  }

  removeItem() {
    console.log('Removing item:', this.yerba);
    this.yerbaRemoved.emit(this.yerba);
  }
}
