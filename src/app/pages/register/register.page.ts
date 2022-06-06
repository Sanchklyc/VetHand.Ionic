import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { MatchValuesValidator } from 'src/app/validators/matcvalues.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(
    private navController: NavController,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        gsm: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        passwordConfirm: ['', [Validators.required]],
      },
      { validator: MatchValuesValidator('password', 'passwordConfirm') }
    );
  }
  goBack() {
    this.navController.back();
  }
  goNext() {
    if (this.registerForm.invalid) {
      this.toastService.showErrorMessage('Lütfen tüm alanları eksiksiz doldurunuz.');
      return;
    }
    this.authService.register(this.registerForm.value).subscribe((response) => {
      if (response.success) {
        this.toastService.showSuccessMessage(response.message);
        this.navController.navigateForward('login');
        return;
      }
      this.toastService.showErrorMessage(response.message);
    });
  }
}
