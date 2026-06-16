import { Component, HostBinding, Input } from '@angular/core';
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

  addYerbaToCart(yerba: Yerba) {
    
  }

}
