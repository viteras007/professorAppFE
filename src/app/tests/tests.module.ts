import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

import { UsersRoutingModule } from './tests-routing.module';
import { UserListComponent } from './test-list/test-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    MatRadioModule
  ],
  declarations: [UserListComponent]
})
export class UsersModule { }
