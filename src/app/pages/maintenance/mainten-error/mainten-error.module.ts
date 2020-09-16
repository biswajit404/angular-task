import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../shared/shared.module';

import { MaintenErrorRoutingModule } from './mainten-error-routing.module';
import { MaintenErrorComponent } from './mainten-error.component';

@NgModule({
  imports: [
    CommonModule,
    MaintenErrorRoutingModule,
    SharedModule
  ],
  declarations: [MaintenErrorComponent]
})
export class MaintenErrorModule { }
