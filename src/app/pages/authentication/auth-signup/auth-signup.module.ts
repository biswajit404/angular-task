import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../shared/shared.module';

import { AuthSignupRoutingModule } from './auth-signup-routing.module';
import { AuthSignupComponent } from './auth-signup.component';

@NgModule({
  imports: [
    CommonModule,
    AuthSignupRoutingModule,
    SharedModule
  ],
  declarations: [AuthSignupComponent]
})
export class AuthSignupModule { }
