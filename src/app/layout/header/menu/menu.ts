import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnChanges {
  @Input() items: any[] = []; // декоратор инпут
  @Input() label: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    // метод жизненного цикла компонента
    console.log('changes', changes);
  }
}
