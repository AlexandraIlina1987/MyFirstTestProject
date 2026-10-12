import { Component } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  constructor() {
    // Subject: создаём канал и отправляем данные в него снаружи
    const numbers$ = new Subject<number>();

    numbers$.subscribe({
      next: (value) => console.log('first', value),
      complete: () => console.log('Первый: конец'),
      error: (value) => console.log('Первый: ошибка', value),
    });
    //numbers$.subscribe((value) => console.log('second', value));

    numbers$.next(1);
    numbers$.next(2);

    // numbers$.subscribe((value) => console.log('Второй', value));
    // numbers$.next(3);
    // numbers$.next(4);

    // numbers$.subscribe({
    //   next: (value) => console.log('four', value),
    //   complete: () => console.log('Четвертый: конец'),
    //   error: (value) => console.log('Четвертый: ошибка', value),
    // });

    numbers$.error('pu pu pu');
    numbers$.complete();

    // Observable: задаём, как появляются данные
    const numbers2$ = new Observable<number>((subscriber) => {
      console.log('Начали работу');
      subscriber.next(1);
      subscriber.next(2);
      subscriber.complete();
    });

    console.log('Observable создан');

    numbers2$.subscribe((value) => console.log('Получено:', value));
    // еще пример для сравнения Observable
    const number3$ = new Observable<number>((subscriber) => {
      console.log('Поток запустился');
      subscriber.next(5);
    });

    number3$.subscribe();
    // Выведет: «Поток запустился»

    const s = number3$.subscribe((value) => console.log('Получено:', value));
    // Выведет: «Поток запустился», затем «Получено: 5»
    s.unsubscribe;
  }
}
