import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
})
export class RegisterDialogComponent implements OnInit {
  title: string;
  message: string;
  registerForm: FormGroup;
  loading: boolean;
  error: string = '';

  constructor(
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
    this.createForm();
  }

  onRegister(): void {
    this.dialogRef.close({ login: true });
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  private createForm() {
    const savedUserEmail = localStorage.getItem('savedUserEmail');

    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      rememberMe: new FormControl(savedUserEmail !== null),
    });
  }

  get f() { return this.registerForm.controls; }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.f.name.value, this.f.email.value, this.f.password.value, this.f.confirmPassword.value)
      .subscribe(
        data => {
          this.data = data;
          setTimeout(() => {
            this.onDismiss();
          }, 1000);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
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
export class RegisterDialogModel {
  constructor(public title: string, public message: string) { }
}
