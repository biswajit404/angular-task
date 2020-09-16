import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../shared/services/blog.service'
import { LoadingState } from '../../shared/components/loading/loading.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: LoadingState = LoadingState.NotReady;
  postList: any = [];
  constructor(
    private blogService: BlogService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loadData()
  }

  loadData(){
    this.loading = LoadingState.Processing
    this.blogService.getPostList().subscribe(
      res => {
        // console.log(res)
        this.postList = res;
        this.loading = LoadingState.Ready
      },
      error => {
        // console.log(error)
        this.loading = LoadingState.Ready
      }
    )
  }

  delete(id,i){
    this.loading = LoadingState.Processing
    this.blogService.deletePost(id).subscribe(
      res => {
        console.log(res)
        this.postList.splice(i,1)
        this.toastr.success('Post has been deleted', '', {
          timeOut: 3000,
        });
        this.loading = LoadingState.Ready
      },
      error => {
        console.log(error)
        this.loading = LoadingState.Ready
      }
    )
  }

}
