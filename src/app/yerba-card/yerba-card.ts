import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Yerba } from '../yerba-list/Yerba';


@Component({
  selector: 'app-yerba-card',
  imports: [],
  templateUrl: './yerba-card.html',
  styleUrl: './yerba-card.scss',
})
export class YerbaCard {
  @HostBinding('class') hostClass = 'yerba-card';
  
  @Input()
  yerba!: Yerba;

  @Output()
  quantityChange: EventEmitter<number> = new EventEmitter<number>();

  addYerba() {
    if (this.yerba.quantity < this.yerba.stock) {
      this.yerba.quantity++;
      this.quantityChange.emit(this.yerba.quantity);
    }
  }

}
