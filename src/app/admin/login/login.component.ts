import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.nonNullable.group({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', Validators.required),
  });
  checkValidation = false;
  showLoading = false;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private sharedService: SharedService
  ) {}
  validateForm(): boolean {
    if (
      (this.loginForm.controls['username'].dirty ||
        this.loginForm.controls['username'].touched) &&
      (this.loginForm.controls['password'].dirty ||
        this.loginForm.controls['password'].touched)
    ) {
      if (this.loginForm.controls['username'].errors) {
        return false;
      } else if (
        this.loginForm.controls['password'].errors ||
        this.loginForm.controls['password'].value?.trim() === ''
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  login(): void {
    this.validateForm()
      ? (this.checkValidation = false)
      : (this.checkValidation = true);
    if (this.validateForm()) {
      const username = this.loginForm.controls.username.value || '';
      const password = this.loginForm.controls.password.value || '';
      this.showLoading = true;
      this.adminService.login(username, password).subscribe((res) => {
        if (res) {
          this.showLoading = false;
          this.router.navigate(['/admin/articles']);
        } else {
          this.showLoading = false;
          this.sharedService.showErrorNotification(this.adminService.error[0]);
        }
      });
    }
  }
}
