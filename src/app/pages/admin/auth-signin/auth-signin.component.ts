import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingState } from '../../../shared/components/loading/loading.component';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {UserList} from '../../../fack-db/user-data';
@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  form: FormGroup;
  loading: LoadingState = LoadingState.NotReady;
  userList: any =[]
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.userList = UserList.user;
    console.log(this.userList)
  }

  signin() {
    console.log(this.form.value)
    if (this.form.valid) {      
      var index = this.userList.findIndex(x => x.username == this.form.value.username && x.password == this.form.value.password)
      console.log(index)
      if (index != -1) {
        localStorage.setItem('isAdminLoggedin', 'true');
        this.toastr.success('You have been successfully logged in', '', {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/admin/dashboard');
      }
      else{
        this.toastr.error('You have enter wrong username & password', '', {
          timeOut: 3000,
        });
      }
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
