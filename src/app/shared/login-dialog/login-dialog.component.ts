import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {
  title: string;
  message: string;
  loginForm: FormGroup;
  loading: boolean;
  error: string = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogModel
  ) {
    this.title = data.title;
    this.message = data.message;

    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // this.titleService.setTitle('angular-material-template - Login');
    // this.authenticationService.logout();
    this.createForm();
  }

  private createForm() {
    const savedUserEmail = localStorage.getItem('savedUserEmail');

    this.loginForm = new FormGroup({
      email: new FormControl(savedUserEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(savedUserEmail !== null),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.data = data;
          this.router.navigate(['/dashboard']);
          setTimeout(() => {
            this.onDismiss();
          }, 1000);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  onRegister(): void {
    this.dialogRef.close({ register: true });
  }
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  resetPassword() {
    this.router.navigate(['/auth/password-reset-request']);
  }

}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class LoginDialogModel {
  constructor(public title: string, public message: string) { }
}
