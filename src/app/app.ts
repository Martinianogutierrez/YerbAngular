import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenu } from "./nav-menu/nav-menu";
import { FooterYerba } from "./footer-yerba/footer-yerba";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterYerba, NavMenu],
  templateUrl: './app.html',
  styleUrl:'./app.scss'
})
export class App {
  protected readonly title = 'YerbAngular';

}
