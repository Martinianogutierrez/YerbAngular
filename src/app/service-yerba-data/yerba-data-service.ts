import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Yerba } from '../yerba-list/Yerba';
import { Observable, tap } from 'rxjs';

const URL = "https://6a29b101f59cb8f65f1d7de4.mockapi.io/api/angular/yerbas";

@Injectable({
  providedIn: 'root',
})
export class YerbaDataService {

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Yerba[]> {
    return this.httpClient.get<Yerba[]>(URL).pipe(tap((yerbas: Yerba[]) => {
      yerbas.forEach(yerba => {
        yerba.quantity = 0;
      });
    }));
  }
}
