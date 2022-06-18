import { QuestionService } from './../../core/services/question.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class CustomerListComponent implements OnInit {
  questions: Object = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private questionService: QuestionService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
    // this.titleService.setTitle('angular-material-template - Customers');
    // this.logger.log('Customers loaded');
    // this.dataSource.sort = this.sort;
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value)),
    // );
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }
}
