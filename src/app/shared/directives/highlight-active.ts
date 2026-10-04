import {
  AfterViewInit,
  Directive,
  OnChanges,
  OnInit,
  Input,
  ElementRef,
  SimpleChanges,
  Output,
  EventEmitter,
  output,
} from '@angular/core';

@Directive({
  selector: '[appHighlightActive]',
  host: {
    '(document:keyup)': 'initKeyUp($event)', // слушаем событие keyup на документе(круглые скобки)/ Если квадратные скобки, то это атрибут HTML-элемента
  },
})
export class HighlightActive implements AfterViewInit, OnInit, OnChanges {
  @Input() selector: string;
  //selector = input.required<string>(); // альтернативный способ декларирования input
  @Input() initFirst: boolean = true;
  @Input() updateView: boolean = false;
  @Input() sort: (el1: HTMLElement, el2: HTMLElement) => number; //= null; свойство для сортировки элементов

  // создаем экземпляр EventEmitter с типом { el: HTMLElement; index: number }: определяем структуру, которую будем отправлять при событии
  @Output() onEnter = new EventEmitter<{ el: HTMLElement; index: number }>();
  //onEnter = output<{ el: HTMLElement; index: number }>(); // альтернативный способ декларирования output
  private index: number = 0;
  private isloaded = false;
  private items: HTMLElement[];
  constructor(private el: ElementRef) {} // инжектим свойство с типом ElementRef
  // private el = inject(ElementRef); // альтернативный способ инжекта

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.items = this.el
        ? Array.from((this.el.nativeElement as HTMLElement).querySelectorAll(this.selector))
        : [];

      // if (this.sort) {
      //   this.items.sort(this.sort);
      // }

      if (this.initFirst && this.items?.length) {
        this.changeIndex(0);
      }

      //console.log('items', this.items);
    }, 1000);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

  changeIndex(shift: -1 | 1 | 0) {
    // сдвиг индекса на 1, -1 или 0
    const items = this.items;

    if (!items.length) {
      return;
    } // если нет элементов, то выходим

    const index = items.findIndex(
      // находим индекс активного элемента
      (e: Element) => e.classList.contains('active'), // проверяем, есть ли у элемента класс active
    );

    this.index = index === -1 ? 0 : index; // если активного элемента нет, то ставим 0
    items[this.index].classList.remove('active'); // удаляем класс active у активного элемента

    this.index += shift; // сдвигаем индекс на 1, -1 или 0

    if (this.index < 0) {
      // если индекс меньше 0, то ставим его равным последнему элементу
      this.index = items.length - 1;
    }

    if (this.index > items.length - 1) {
      // если индекс больше последнего элемента, то ставим его равным 0
      this.index = 0;
    }

    items[this.index].classList.toggle('active'); // добавляем класс active к элементу с индексом this.index
    (items[this.index] as HTMLDivElement).scrollIntoView({
      // прокручиваем к элементу с индексом this.index
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }

  initKeyUp(e: KeyboardEvent) {
    const typedEvent = e;
    // console.log('event!!!', typedEvent);

    if (typedEvent.key === 'ArrowRight') {
      this.changeIndex(1);
    } else if (typedEvent.key === 'ArrowLeft') {
      this.changeIndex(-1);
    } else if (typedEvent.key === 'Enter') {
      this.onEnter.emit({ el: this.items[this.index], index: this.index });
    }
  }
}
