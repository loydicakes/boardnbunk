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

  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public FirestoreService: FirestoreService, public router: Router) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  async signUp() {
  const loading = await this.loadingCtrl.create();
  await loading.present();

  if (this.regForm?.valid) {
    const email = this.regForm.get('email').value;
    const password = this.regForm.get('password').value;
    try {
      const user = await this.FirestoreService.registerUser(email, password);
      console.log('User registered successfully:', user);
      loading.dismiss();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      await loading.dismiss();
    }
  }
}

}
