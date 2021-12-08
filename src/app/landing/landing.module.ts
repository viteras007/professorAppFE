import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LandingHomeComponent } from './landing-home/landing-home.component';

@NgModule({
  declarations: [LandingHomeComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ],
  entryComponents: []
})
export class LandingModule { }
