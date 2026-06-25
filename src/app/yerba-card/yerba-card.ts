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
  
  @Input() yerba!: Yerba;


  @Input() avaliableStock!: number;

  @Output() quantityChange: EventEmitter<Yerba> = new EventEmitter<Yerba>();

  addYerba() {
    if (this.avaliableStock > 0) {
      this.quantityChange.emit(this.yerba);
    }
  }

}
