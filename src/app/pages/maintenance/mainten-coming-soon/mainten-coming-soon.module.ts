import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../shared/shared.module';

import { MaintenComingSoonRoutingModule } from './mainten-coming-soon-routing.module';
import { MaintenComingSoonComponent } from './mainten-coming-soon.component';

@NgModule({
  imports: [
    CommonModule,
    MaintenComingSoonRoutingModule,
    SharedModule
  ],
  declarations: [MaintenComingSoonComponent]
})
export class MaintenComingSoonModule { }
