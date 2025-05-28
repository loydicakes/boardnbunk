import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  regForm: FormGroup | undefined;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public FirestoreService: FirestoreService,
    public router: Router
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  revealPassword(type: 'password' | 'confirm') {
    if (type === 'password') {
      this.showPassword = true;
      setTimeout(() => (this.showPassword = false), 1000);
    } else {
      this.showConfirmPassword = true;
      setTimeout(() => (this.showConfirmPassword = false), 1000);
    }
  }

  checkPasswordInputs() {
    // Trigger change detection on input events if needed
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.regForm?.valid) {
      const email = this.regForm.get('email')?.value;
      const password = this.regForm.get('password')?.value;
      const firstname = this.regForm.get('firstname')?.value;
      const lastname = this.regForm.get('lastname')?.value;

      try {
        const userCredential = await this.FirestoreService.registerUser(
          email,
          password,
          firstname,
          lastname
        );
        console.log('User registered successfully:', userCredential);
        loading.dismiss();
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Registration error:', error);
        loading.dismiss();
      }
    } else {
      loading.dismiss();
    }
  }

  get errorControl() {
    return this.regForm?.controls;
  }
}
