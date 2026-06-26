import { Component, HostBinding, Input } from '@angular/core';
import { YerbaList } from "../yerba-list/yerba-list";
import { CartYerba } from "../cart-yerba/cart-yerba";

@Component({
  selector: 'app-yerba-store',
  imports: [YerbaList, CartYerba],
  templateUrl: './yerba-store.html',
  styleUrl: './yerba-store.scss',
})
export class YerbaStore {

  @Input() cartOpen!: boolean;

}
