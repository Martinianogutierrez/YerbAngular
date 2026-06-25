import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, PLATFORM_ID, computed, inject, signal, viewChild } from '@angular/core';
import { Yerba } from './Yerba';
import { YerbaCard } from '../yerba-card/yerba-card';
import { YerbaCartService } from '../service-yerba-cart/yerba-cart-service';
import { YerbaDataService } from '../service-yerba-data/yerba-data-service';

@Component({
  selector: 'app-yerba-list',
  templateUrl: './yerba-list.html',
  styleUrl: './yerba-list.scss',
  imports: [YerbaCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'shop-column'
  }
})
export class YerbaList implements AfterViewInit {
  
  yerbas: Yerba[] = [];
  liveCart: Yerba[] = [];
  constructor(private cartService: YerbaCartService, private yerbaDataService: YerbaDataService) {}

  ngOnInit(): void {
    this.yerbaDataService.getAll().subscribe((yerbasData) => {this.yerbas = yerbasData;});
  }

  onQuantityChange(yerbaAgregada: Yerba) {
      yerbaAgregada.quantity++;
      this.addYerbaToCart(yerbaAgregada);
  }

  addYerbaToCart(yerba: Yerba) {
    if (yerba.quantity <= yerba.stock) {
      this.cartService.addToCart(yerba);
    }
  }








  // Logica de carrusel y division de slides para las cards de yerbas
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly carouselWrapper = viewChild<ElementRef<HTMLElement>>('carouselWrapper');
  private readonly carouselTrack = viewChild<ElementRef<HTMLElement>>('carouselTrack');

  private readonly cardsPerSlide = 3;
  private readonly slideStep = 3;

  readonly currentSlide = signal(0);
  readonly visibleCards = signal(this.cardsPerSlide);

  private readonly cardStepPx = signal(0);

  readonly maxSlide = computed(() => Math.max(this.yerbas.length - this.visibleCards(), 0));
  readonly dotIndexes = computed(() =>
    Array.from({ length: Math.ceil(this.yerbas.length / this.slideStep) }, (_, index) => {
      const targetIndex = index * this.slideStep;
      return Math.min(targetIndex, this.maxSlide());
    })
  );
  readonly trackTransform = computed(() => `translateX(-${this.currentSlide() * this.cardStepPx()}px)`);
  readonly canGoPrev = computed(() => this.currentSlide() > 0);
  readonly canGoNext = computed(() => this.currentSlide() < this.maxSlide());

  ngAfterViewInit(): void {
    this.recalculateCarousel();
  }

  nextSlide(): void {
    this.slideTo(this.currentSlide() + this.slideStep);
  }

  prevSlide(): void {
    this.slideTo(this.currentSlide() - this.slideStep);
  }

  slideTo(index: number): void {
    const clampedSlide = Math.max(0, Math.min(index, this.maxSlide()));
    this.currentSlide.set(clampedSlide);
  }

  private recalculateCarousel(): void {
    if (!this.isBrowser) {
      return;
    }

    const wrapper = this.carouselWrapper()?.nativeElement;
    const track = this.carouselTrack()?.nativeElement;
    if (!wrapper) {
      return;
    }

    const wrapperStyles = window.getComputedStyle(wrapper);

    const paddingLeft = Number.parseFloat(wrapperStyles.paddingLeft) || 0;
    const paddingRight = Number.parseFloat(wrapperStyles.paddingRight) || 0;
    const usableWidth = wrapper.clientWidth - paddingLeft - paddingRight;

    const visibleCards = this.cardsPerSlide;
    const gap = 18;
    const cardWidth = (usableWidth - gap * (visibleCards - 1)) / visibleCards;
    const step = cardWidth + gap;

    this.cardStepPx.set(Math.max(step, 0));
    this.slideTo(this.currentSlide());
  }
}
