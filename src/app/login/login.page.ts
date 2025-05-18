import { FirestoreService } from './../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular'; // Import AlertController
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    public FirestoreService: FirestoreService,
    public LoadingCtrl: LoadingController,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

async onSubmit() {
  const loading = await this.LoadingCtrl.create();
  await loading.present();

  if (this.loginForm?.valid) {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    try {
      const result = await this.FirestoreService.loginUser(email, password);
      loading.dismiss();

      if (result && result.usertype) {
        const usertype = result.usertype;

        // 👇 Conditional navigation
        if (usertype === 'landlord') {
          this.router.navigate(['/landlord-home']);
        } else {
          this.router.navigate(['/homepage']);
        }
      }
    } catch (error) {
      loading.dismiss();
      await this.presentAlert('Login failed', 'Invalid email or password');
    }
  } else {
    loading.dismiss();
    this.loginForm.markAllAsTouched();
  }
}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
