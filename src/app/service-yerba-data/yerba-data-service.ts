import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Yerba } from '../yerba-list/Yerba';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { YerbaCartService } from '../service-yerba-cart/yerba-cart-service';

const URL = "https://6a29b101f59cb8f65f1d7de4.mockapi.io/api/angular/yerbas";

@Injectable({
  providedIn: 'root',
})
export class YerbaDataService {

  private _yerbasData: Yerba[] = [];
  yerbasData: BehaviorSubject<Yerba[]> = new BehaviorSubject<Yerba[]>(this._yerbasData);

  constructor(private httpClient: HttpClient, private yerbaCart: YerbaCartService) {

    this.httpClient.get<Yerba[]>(URL).pipe(tap((yerbas: Yerba[]) => {
      yerbas.forEach(yerba => {yerba.quantity = 0 });
    })).subscribe((yerbas: Yerba[]) => {
      this._yerbasData = yerbas;
      this.yerbasData.next(yerbas);
    });
   }

  public addYerbaToCart(yerba: Yerba): void { 
    this.yerbaCart.addToCart(yerba);
  }
}
