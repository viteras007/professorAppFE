import { QuestionService } from './../../core/services/question.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  askSelected = '';
  subcjetSelected = '';
  themeSelected = '';
  levelSelected = '';
  typeSelected = '';
  questions: Object = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  query: string = '';

  @Output() doFilter = new EventEmitter<string>();

  constructor(
    private questionService: QuestionService,
  ) {
  }

  ngOnInit() { }

  doSearch() {
    this.query = '';
    if (this.levelSelected !== '') {
      this.query = '?level=' + this.levelSelected
    }

    if (this.subcjetSelected !== '') {
      this.query === '' ? this.query = '?subject=' + this.subcjetSelected : this.query += '&subject=' + this.subcjetSelected;
    }

    // if (this.askSelected !== 'N') {
    //   this.query === '' ? '?subject=' + this.subcjetSelected : this.query + '&subject=' + this.subcjetSelected;
    // }

    this.doFilter.emit(this.query)
  }

  resetFilter() {
    this.askSelected = '';
    this.subcjetSelected = '';
    this.themeSelected = '';
    this.levelSelected = '';
    this.typeSelected = '';
    this.doSearch();
  }
}
