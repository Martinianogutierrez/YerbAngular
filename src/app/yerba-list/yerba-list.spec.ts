import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YerbaList } from './yerba-list';

describe('YerbaList', () => {
  let component: YerbaList;
  let fixture: ComponentFixture<YerbaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YerbaList],
    }).compileComponents();

    fixture = TestBed.createComponent(YerbaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
