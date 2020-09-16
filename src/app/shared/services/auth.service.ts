import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpWithoutInterceptor: HttpClient;
  constructor(
    private router: Router,
    private handler: HttpBackend
  ) {
    this.httpWithoutInterceptor = new HttpClient(this.handler);
  }

  signin(data: any) {
    return this.httpWithoutInterceptor.post(environment.apiEndpoint + 'login/', data);
  }

  signup(data: any) {
    return this.httpWithoutInterceptor.post(environment.apiEndpoint + 'signup/', data);
  }

}
