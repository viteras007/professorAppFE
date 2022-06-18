import { Component, EventEmitter, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NGXLogger } from 'ngx-logger';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { jsPDF } from 'jspdf';


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
  questionsquantity: string[] = [];

  constructor(
    private logger: NGXLogger,
    private titleService: Title,
  ) { }

  ngOnInit() {
    // this.titleService.setTitle('angular-material-template - Users');
    // this.logger.log('Users loaded');
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value)),
    // );
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

  gerarPDF() {
    let documento = new jsPDF();
    documento.text("Relatório em PDF no Angular", 10, 10);
    documento.output("dataurlnewwindow");
    // behavior subject
  }
}
