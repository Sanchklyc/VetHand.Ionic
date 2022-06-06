import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private authService: AuthService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      gsm: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onClickLogin() {
    if (this.loginForm.invalid) {
      this.toastService.showErrorMessage('Lütfen gerekli tüm alanları doldurunuz.');
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(async (response) => {
      if (response.success) {
        await this.authService.setToken(response.data.token);
        this.toastService.showSuccessMessage(response.message);
        this.navController.navigateRoot('/tabs/tab1');
      } else {
        this.toastService.showErrorMessage(response.message);
      }
    });
  }
  onClickRegister() {
    this.navController.navigateForward('register');
  }
}
