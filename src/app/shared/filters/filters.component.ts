import { QuestionService } from './../../core/services/question.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  askSelected = 'option0';
  subcjetSelected = 'N';
  themeSelected = 'option0';
  levelSelected = 'N';
  typeSelected = 'option0';
  questions: Object = [];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  query: string = '';

  @Output() doFilter = new EventEmitter<string>();

  constructor(
    private questionService: QuestionService,
  ) {
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  clickFilter() {
    this.query = '';
    if (this.levelSelected !== 'N') {
      this.query = '?level=' + this.levelSelected
    }

    if (this.subcjetSelected !== 'N') {
      this.query === '' ? this.query = '?subject=' + this.subcjetSelected : this.query += '&subject=' + this.subcjetSelected;
    }

    // if (this.askSelected !== 'N') {
    //   this.query === '' ? '?subject=' + this.subcjetSelected : this.query + '&subject=' + this.subcjetSelected;
    // }

    this.doFilter.emit(this.query)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
