import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Yerba } from './Yerba';
import { YerbaCard } from '../yerba-card/yerba-card';
import { YerbaCartService } from '../service-yerba-cart/yerba-cart-service';

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

  onQuantityChange($event: number) {
    console.log('Quantity changed:', $event);
  }

  cartService: YerbaCartService = inject(YerbaCartService);

  addToCart(yerba: Yerba) {
    this.cartService.addToCart(yerba);
  }

  yerbas: Yerba[] = [
  {
    "id": 1,
    "name": "Taragüi 1kg",
    "weight": 1000,
    "price": 4850,
    "limitedEdition": false,
    "hasStick": true,
    "dustPercentage": 10,
    "stock": 2,
    "quantity": 0
  },
  {
    "id": 2,
    "name": "Taragüi 750g",
    "weight": 750,
    "price": 3690,
    "limitedEdition": false,
    "hasStick": true,
    "dustPercentage": 10,
    "stock": 0,
    "quantity": 0
  },
  {
    "id": 3,
    "name": "Amanda 1kg",
    "weight": 1000,
    "price": 4600,
    "limitedEdition": false,
    "hasStick": true,
    "dustPercentage": 0,
    "stock": 5,
    "quantity": 0
  },
  {
    "id": 4,
    "name": "Amanda 750g",
    "weight": 750,
    "price": 3500,
    "limitedEdition": false,
    "hasStick": true,
    "dustPercentage": 0,
    "stock": 0,
    "quantity": 0
  },
  {
    "id": 5,
    "name": "La Merced 1kg",
    "weight": 1000,
    "price": 5200,
    "limitedEdition": false,
    "hasStick": true,
    "dustPercentage": 15,
    "stock": 3,
    "quantity": 0
  },
  {
    "id": 6,
    "name": "La Merced 750g",
    "weight": 750,
    "price": 3950,
    "limitedEdition": false,
    "hasStick": true,
    "dustPercentage": 15,
    "stock": 0,
    "quantity": 0
  },
  {
    "id": 7,
    "name": "Rosamonte 1kg",
    "weight": 1000,
    "price": 5100,
    "limitedEdition": false,
    "hasStick": true,
    "dustPercentage": 20,
    "stock": 7,
    "quantity": 0
  },
  {
    "id": 8,
    "name": "Rosamonte 750g",
    "weight": 750,
    "price": 3870,
    "limitedEdition": false,
    "hasStick": true,
    "dustPercentage": 20,
    "stock": 4,
    "quantity": 0
  },
  {
    "id": 9,
    "name": "Cruz de Malta 1kg",
    "weight": 1000,
    "price": 4750,
    "limitedEdition": false,
    "hasStick": false,
    "dustPercentage": 5,
    "stock": 0,
    "quantity": 0
  },
  {
    "id": 10,
    "name": "Cruz de Malta 750g",
    "weight": 750,
    "price": 3610,
    "limitedEdition": false,
    "hasStick": false,
    "dustPercentage": 5,
    "stock": 6,
    "quantity": 0
  }
  ];

  // Logica de carrusel y division de slides de cards
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
