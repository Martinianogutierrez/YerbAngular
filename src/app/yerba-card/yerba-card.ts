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
  stockChange: EventEmitter<number> = new EventEmitter<number>();

  addYerba() {
    this.yerba.stock--;
    this.stockChange.emit(this.yerba.stock);
  }

}
