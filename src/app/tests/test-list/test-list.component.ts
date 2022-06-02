import { QuestionService } from './../../core/services/question.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NGXLogger } from 'ngx-logger';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class UserListComponent implements OnInit {
  askSelected: string = 'option0';
  subcjetSelected: string = 'option0';
  themeSelected: string = 'option0';
  levelSelected: string = 'option0';
  typeSelected: string = 'option0';
  questionsCount: number = 0;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  myControl: FormControl = new FormControl();

  emitNewQuestion = new EventEmitter<string>();
  static createdNewQuestion = new EventEmitter<string>();
  questionsquantity: string[] = [];

  constructor(
    private logger: NGXLogger,
    private titleService: Title,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.titleService.setTitle('angular-material-template - Users');
    this.logger.log('Users loaded');
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addQuestion(quantity: string) {
    this.questionsquantity.push(quantity);
    this.emitNewQuestion.emit(quantity);
    UserListComponent.createdNewQuestion.emit(quantity);
    this.questionsCount = this.questionsquantity.length;
  }

  removeQuestion(quantity: string) {
    this.questionsquantity.pop();
    this.emitNewQuestion.emit(quantity);
    UserListComponent.createdNewQuestion.emit(quantity);
    this.questionsCount = this.questionsquantity.length;
  }
}
