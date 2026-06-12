import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YerbaAbout } from './yerba-about';

describe('YerbaAbout', () => {
  let component: YerbaAbout;
  let fixture: ComponentFixture<YerbaAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YerbaAbout],
    }).compileComponents();

    fixture = TestBed.createComponent(YerbaAbout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
