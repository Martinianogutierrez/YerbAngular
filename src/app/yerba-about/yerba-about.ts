import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-yerba-about',
  imports: [],
  templateUrl: './yerba-about.html',
  styleUrl: './yerba-about.scss',
})
export class YerbaAbout {
   @HostBinding('class') hostClass = 'shop-column';
}
