import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private httpWithoutInterceptor: HttpClient;
  constructor(
    private router: Router,
    private handler: HttpBackend
  ) {
    this.httpWithoutInterceptor = new HttpClient(this.handler);
  }

  getPostList() {
    return this.httpWithoutInterceptor.get('https://jsonplaceholder.typicode.com/posts');
  }

  addPost(data: any) {
    return this.httpWithoutInterceptor.post('https://jsonplaceholder.typicode.com/posts', data);
  }

  getPostDetails(id: number) {
    return this.httpWithoutInterceptor.get('https://jsonplaceholder.typicode.com/posts/'+id);
  }

  updatePost(id:number,data: any) {
    return this.httpWithoutInterceptor.put('https://jsonplaceholder.typicode.com/posts/'+id, data);
  }

  deletePost(id:number) {
    return this.httpWithoutInterceptor.delete('https://jsonplaceholder.typicode.com/posts/'+id);
  }
}
