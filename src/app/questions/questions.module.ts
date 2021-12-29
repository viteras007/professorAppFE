import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './questions-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomerListComponent } from './question-list/question-list.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule
  ],
  declarations: [
    CustomerListComponent
  ],
  entryComponents: [
  ]
})
export class CustomersModule { }
