import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  DestroyRef,
  OnDestroy,
} from '@angular/core';
import { Tours as ToursService } from '../../services/tours';
import { ITour, IToursResponse, ITourTypes } from '../../models/tours';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HighlightActive } from '../../shared/directives/highlight-active';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tours',
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe,
    HighlightActive,
    MatInputModule,
    MatFormFieldModule,
  ], // импортируем класс директивы
  templateUrl: './tours.html',
  styleUrl: './tours.scss',
})
export class Tours implements OnInit, AfterViewInit, OnDestroy {
  // указываем декоратор к свойству класса
  @ViewChild('highLightDirective', { read: HighlightActive }) highLightDirective!: HighlightActive;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  // @ViewChild('searchInput') — найди в шаблоне элемент с #searchInput.
  // searchInput после декоратора — свойство класса, в которое Angular поместит ссылку.
  // ElementRef<HTMLInputElement> — обёртка Angular над HTML-инпутом.
  // .nativeElement — сам инпут внутри этой обёртки.
  private destroyRef = inject(DestroyRef); // для отмены подписок при уничтожении компонента

  private toursService = inject(ToursService);
  private router = inject(Router);

  //tours = signal<ITour[]>([]);
  tours: ITour[] = [];
  toursCopy: ITour[] = [];
  toursLoaded = false;
  searchValue = '';
  tourTypeFilter: ITourTypes = 'all';
  tourDateFilter: Date | null = null;
  private _unsibscribe = new Subject<boolean>();

  ngOnInit(): void {
    this.toursService.getTours().subscribe((data: IToursResponse) => {
      console.log('data tours', data.tours);
      // this.tours.set(data.tours);
      this.tours = data.tours;
      this.toursCopy = [...this.tours];
      this.toursLoaded = true;
      this.initTourFilterLogic();

      // console.log('this.tours', this.tours);
    });

    this.toursService.tourType$.pipe(takeUntil(this._unsibscribe)).subscribe((type: ITourTypes) => {
      this.tourTypeFilter = type;
      this.initTourFilterLogic();
    });
    this.toursService.tourDate$.pipe(takeUntil(this._unsibscribe)).subscribe((date) => {
      this.tourDateFilter = date;
      this.initTourFilterLogic();
    });
  }

  //ngAfterViewInit() — выполняется, когда поле уже создано и доступно через ViewChild
  // fromEvent — функция RxJS, создающая Observable из событий, создает поток событий.
  // <Event> — тип значений в потоке.
  // this.searchInput — ссылка на поле, полученная через @ViewChild.
  // nativeElement — сам HTML-элемент <input>.
  // У функции fromEvent два аргумента:ГДЕ слушать,КАКОЕ событие слушать
  // debounceTime(300) — пропускает последнее событие после паузы.
  // subscribe() — подписывается и вызывает существующий поиск.
  // takeUntilDestroyed() — автоматически завершает подписку при уходе со страницы.
  ngAfterViewInit(): void {
    fromEvent<Event>(this.searchInput.nativeElement, 'input')
      .pipe(debounceTime(3000), takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        this.searchTours(event);
      });
  }

  ngOnDestroy(): void {
    this._unsibscribe.next(true);
    this._unsibscribe.complete();
  }

  updateView(): void {
    setTimeout(() => {
      this.highLightDirective?.initItems();
    }, 0);
  }

  goToTour(tour: ITour) {
    if (tour?.id) {
      this.router.navigate([`tour/${tour.id}`]);
    }
  }

  onEnter(ev: { el: HTMLElement; index: number }) {
    const tourId = ev.el.getAttribute('data-tour-id');
    if (tourId) {
      this.goToTour({ id: tourId } as ITour);
    }
    console.log('tourId', tourId);
  }

  //searchTours(Ev: Event) {
  //console.log('Ev!!!', Ev);
  //   const searchValue = (Ev.target as HTMLInputElement).value;
  //   //console.log('searchValue', searchValue);
  //   const regExp = new RegExp(searchValue, 'i');
  //   if (!searchValue) {
  //     this.tours = [...this.toursCopy];
  //   } else {
  //     this.tours = this.toursCopy.filter(
  //       (el) => regExp.test(el.name) || regExp.test(el.description),
  //     );
  //   }
  //   this.updateView();
  // }

  searchTours(event: Event): void {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.initTourFilterLogic();
  }

  initTourFilterLogic(): void {
    const search = this.searchValue.trim().toLowerCase();

    const date = this.tourDateFilter;
    const selectedDate = date
      ? [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, '0'),
          String(date.getDate()).padStart(2, '0'),
        ].join('-')
      : null;

    this.tours = this.toursCopy.filter((tour) => {
      const type = tour.type || 'single'; //Если у тура есть непустой type, используем его. Иначе считаем тур одиночным.

      const matchesType = this.tourTypeFilter === 'all' || type === this.tourTypeFilter;

      const matchesSearch =
        tour.name.toLowerCase().includes(search) || tour.description.toLowerCase().includes(search);

      const matchesDate = selectedDate === null || tour.date === selectedDate;

      return matchesType && matchesSearch && matchesDate;
    });

    this.updateView();
  }
}
