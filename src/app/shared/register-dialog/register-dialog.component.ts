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

  loginForm: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
    // this.titleService.setTitle('angular-material-template - Login');
    // this.authenticationService.logout();
    this.createForm();
  }

  onLogin(): void {
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

    this.loginForm = new FormGroup({
      email: new FormControl(savedUserEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(savedUserEmail !== null),
    });
  }

  login() {
    // const email = this.loginForm.get('email').value;
    // const password = this.loginForm.get('password').value;
    // const rememberMe = this.loginForm.get('rememberMe').value;

    // this.loading = true;
    // this.authenticationService.login(email.toLowerCase(), password).subscribe(
    //   (data) => {
    //     if (rememberMe) {
    //       localStorage.setItem('savedUserEmail', email);
    //     } else {
    //       localStorage.removeItem('savedUserEmail');
    //     }
    //     this.router.navigate(['/']);
    //     this.dialogRef.close();
    //   },
    //   (error) => {
    //     this.notificationService.openSnackBar(error.error);
    //     this.loading = false;
    //   }
    // );
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
