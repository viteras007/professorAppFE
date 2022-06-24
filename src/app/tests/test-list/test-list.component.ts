import { MatDialog } from '@angular/material';
import { QuestionService } from './../../core/services/question.service';
import { Component, EventEmitter, OnInit, } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class UserListComponent implements OnInit {
  questionsCount: number = 0;
  myControl: FormControl = new FormControl();
  emitNewQuestion = new EventEmitter<string>();
  static createdNewQuestion = new EventEmitter<string>();
  questionsquantity: any = [];
  questions: Object = [];
  questionsSelected: Object = [];
  choice: any;

  constructor(
    public dialog: MatDialog,
    private questionService: QuestionService
  ) { }

  ngOnInit() { }

  getData(query?: string) {
    this.questionService.getQuestions(query).subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addQuestion(quantity) {
    this.questionsquantity.push({ number: quantity, flagQuestao: false, dataQuestao: null });
    this.emitNewQuestion.emit(quantity);
    UserListComponent.createdNewQuestion.emit(quantity);
    this.questionsquantity.number = this.questionsquantity.length;
  }

  removeQuestion(quantity) {
    this.questionsquantity.pop();
    this.emitNewQuestion.emit(quantity);
    UserListComponent.createdNewQuestion.emit(quantity);
    this.questionsCount = this.questionsquantity.length;
  }

  confirmQuestion(position, question) {
    if (question !== undefined) {
      this.questionsquantity[position].dataQuestao = question;
      this.questionsquantity[position].flagQuestao = true;
    }
  }
}