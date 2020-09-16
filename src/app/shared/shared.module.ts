import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BreadcrumbModule, CardModule, LoadingModule } from './components';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { LightboxModule } from 'ngx-lightbox';
import {NgbPopoverModule, NgbProgressbarModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { DxDataGridModule } from 'devextreme-angular';
// Guards
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminLoggedInGuard } from './guards/admin-logged-in.guard';

// Services
import { AuthService } from './services/auth.service';
import { InterceptorService } from './services/interceptor.service';
import { BlogService } from './services/blog.service';
import { ExportFileService } from './services/export-file.service';
// components
import { SpinnerComponent } from './components/spinner/spinner.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardModule,
    LoadingModule,
    BreadcrumbModule,
    ClickOutsideModule,
    LightboxModule,
    NgbPopoverModule,
    NgbProgressbarModule,
    NgbTabsetModule,
    DxDataGridModule
  ],
  exports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardModule,
    LoadingModule,
    BreadcrumbModule,
    LightboxModule,
    ClickOutsideModule,
    NgbPopoverModule,
    NgbProgressbarModule,
    NgbTabsetModule,
    DxDataGridModule,
    
    SpinnerComponent,
    
  ],
  declarations: [
    SpinnerComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    // Guards
    AuthGuard,
    LoggedInGuard,
    AdminAuthGuard,
    AdminLoggedInGuard,
    // Services
    AuthService,
    BlogService,
    ExportFileService
  ]
})
export class SharedModule {

}
