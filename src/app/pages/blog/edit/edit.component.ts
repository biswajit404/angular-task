import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {BlogService} from '../../../shared/services/blog.service'
import { LoadingState } from '../../../shared/components/loading/loading.component';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  postId: number;
  form: FormGroup;
  loading: LoadingState = LoadingState.NotReady;
  userId:number;
  postDetails: any;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.postId = this.route.snapshot.params['id'];
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      body: [null, Validators.required],
      userId: [null, Validators.required]
    });
    this.userId = +localStorage.getItem('userid')
    this.form.patchValue({
      userId: this.userId
    })
    this.loadData()
  }

  loadData(){
    this.loading = LoadingState.Processing
    this.blogService.getPostDetails(this.postId).subscribe(
      res => {
        console.log(res)
        this.postDetails = res;
        this.loading = LoadingState.Ready
      },
      error => {
        console.log(error)
        this.loading = LoadingState.Ready
      }
    )
  }

  save() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing
      this.blogService.updatePost(this.postId,this.form.value).subscribe(
        res => {
          this.loading = LoadingState.Ready
          this.toastr.success('Post has been updated', '', {
            timeOut: 3000,
          });
          this.router.navigateByUrl('/blog');
        },
        error => {
          this.loading = LoadingState.Ready
        }
      )
    }
    else {
      this.markFormGroupTouched(this.form)
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && (form.get(field).dirty || form.get(field).touched);
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'is-invalid': form.get(field).invalid && (form.get(field).dirty || form.get(field).touched),
      'is-valid': form.get(field).valid && (form.get(field).dirty || form.get(field).touched)
    };
  }
}
