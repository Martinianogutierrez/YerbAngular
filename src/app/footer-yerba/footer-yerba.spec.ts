import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterYerba } from './footer-yerba';

describe('FooterYerba', () => {
  let component: FooterYerba;
  let fixture: ComponentFixture<FooterYerba>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterYerba],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterYerba);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
