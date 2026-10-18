import { Component, inject } from '@angular/core';
import { Tours } from '../../services/tours';
import { ITourTypeSelect, ITourTypes } from '../../models/tours';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-aside',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './aside.html',
  styleUrl: './aside.scss',
  providers: [provideNativeDateAdapter()],
})
export class Aside {
  //tourTypes передаётся в выпадающий список
  tourTypes: ITourTypeSelect[] = [
    { label: 'All Tours', value: 'all' },
    { label: 'Single', value: 'single' },
    { label: 'Multi', value: 'multi' },
  ];

  selectedType: ITourTypes = 'all';
  selectedDate: Date | null = null;
  tourService = inject(Tours);

  changeTourType(value: ITourTypes) {
    this.tourService.setTourType(value);
  }

  changeDate(date: Date | null) {
    this.selectedDate = date;
    console.log(date);
    this.tourService.setTourDate(date);
  }

  clearDate(): void {
    this.changeDate(null);
  }
}
