import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YerbaCart } from './yerba-cart';

describe('YerbaCart', () => {
  let component: YerbaCart;
  let fixture: ComponentFixture<YerbaCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YerbaCart],
    }).compileComponents();

    fixture = TestBed.createComponent(YerbaCart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
