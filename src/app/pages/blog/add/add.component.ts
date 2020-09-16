import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { LoadingState } from '../../../shared/components/loading/loading.component';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {BlogService} from '../../../shared/services/blog.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form: FormGroup;
  loading: LoadingState = LoadingState.NotReady;
  userId:number;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private blogService: BlogService
  ) { }

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
  }

  save() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.loading = LoadingState.Processing
      this.blogService.addPost(this.form.value).subscribe(
        res => {
          this.loading = LoadingState.Ready
          this.toastr.success('New Post has been added', '', {
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
