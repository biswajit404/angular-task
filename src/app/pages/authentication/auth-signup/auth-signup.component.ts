import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingState } from '../../../shared/components/loading/loading.component';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserList } from '../../../fack-db/user-data';
@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {
  form: FormGroup;
  loading: LoadingState = LoadingState.NotReady;
  userList: any = []
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      permission: [null],
    });
    this.userList = UserList.user;
    console.log(this.userList)
    this.form.patchValue({
      id: this.uuidv4(),
      permission: ['add','edit','delete']
    })
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  signup() {
    console.log(this.form.value)
    if (this.form.valid) {
      var index = this.userList.findIndex(x => x.username == this.form.value.username && x.password == this.form.value.password)
      console.log(index)
      if (index == -1) {
        var d = this.form.value
        this.userList.push(d)
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('userid', this.form.value['id'])
        this.toastr.success('You have been successfully register', '', {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/');
      }
      else{
        this.toastr.error('User already exist', '', {
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
