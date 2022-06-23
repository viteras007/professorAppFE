import { QuestionService } from './../../core/services/question.service';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';

import { FormControl } from '@angular/forms';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface EnumChoices {
  [index: number]: {
    alternativeA: string,
    alternativeB: string,
    alternativeC: string,
    alternativeD: string,
    alternativeE: string,
    answer: string,
    ask: string,
    level: string,
    subject: string,
    type: string
  };
}

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
  questions: Object = [];
  choice: any;
  choiceSelected: string[] = [];
  // @ViewChild('htmlData') htmlData!: ElementRef;

  constructor(
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
    documento.text("this.choice", 10, 10);
    documento.output("dataurlnewwindow");
    // documento.save("PROVA - PROFESSORAPP.pdf");

    // let DATA: any = document.getElementById('htmlData');
    // html2canvas(DATA).then((canvas) => {
    //   let fileWidth = 208;
    //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL('image/png');
    //   let PDF = new jsPDF('p', 'mm', 'a4');
    //   let position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    //   PDF.save('angular-demo.pdf');
    // });
  }
}