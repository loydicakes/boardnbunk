import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-profile-pns',
  templateUrl: './profile-pns.page.html',
  styleUrls: ['./profile-pns.page.scss'],
  standalone: false
})
export class ProfilePnsPage implements OnInit {
  firstname = '';
  lastname = '';
  email = '';
  profilePicture: string | null = null;
  profileChanged = false;

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  showNewPassword = false;
  showConfirmPassword = false;
  changePasswordStep = 0;
  isNewPasswordValid = true;
  isConfirmPasswordValid = true;
  isVerifying = false;
  verificationError = '';

  showSaveModal = false;
  showSuccessPopup = false;
  saveAction: 'profile' | 'password' | null = null;

  showStaticPicModal = false;

  staticPics: string[] = [
    'assets/1.jpg', 'assets/2.jpg', 'assets/3.jpg', 'assets/4.jpg',
    'assets/5.jpg', 'assets/6.jpg', 'assets/7.jpg', 'assets/8.jpg', 'assets/9.jpg'
  ];

  originalProfile = {
    firstname: '',
    lastname: ''
  };

  uid: string = '';

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.loadActiveUserProfile(user.uid);
      } else {
        console.warn('User not logged in');
      }
    });
  }

  async loadActiveUserProfile(uid: string) {
    try {
      const userDoc = await this.firestoreService.getUserProfile(uid);

      this.firstname = userDoc.firstname || '';
      this.lastname = userDoc.lastname || '';
      this.email = userDoc.email || '';
      this.profilePicture = userDoc.profilePicture || null;

      this.originalProfile = {
        firstname: this.firstname,
        lastname: this.lastname
      };
    } catch (err) {
      console.error('Failed to load active user profile', err);
    }
  }


  goToProfileMethod() {
    this.router.navigate(['/landlord-profile']);
  }

  onProfileChange() {
    this.profileChanged =
      this.firstname !== this.originalProfile.firstname ||
      this.lastname !== this.originalProfile.lastname;
  }

  onProfileBlur(field: 'firstname' | 'lastname') {
    if (!this.profileChanged) this[field] = this.originalProfile[field];
    this.onProfileChange();
  }

  confirmSave(action: 'profile' | 'password') {
    this.saveAction = action;
    this.showSaveModal = true;
  }

  closeSaveCard() {
    this.showSaveModal = false;
    this.saveAction = null;
  }

  confirmSaveAction() {
    if (this.saveAction === 'profile') this.saveProfile();
    else if (this.saveAction === 'password') this.saveNewPassword();
    this.closeSaveCard();
  }

  simulateSave(callback: () => void) {
    setTimeout(() => {
      this.showSuccessPopup = true;
      callback();
      setTimeout(() => (this.showSuccessPopup = false), 1000);
    }, 1500);
  }

  async saveProfile() {
    try {
      const user = await this.afAuth.currentUser;
      if (!user) throw new Error('User not logged in');

      await this.firestoreService.updateUserProfile(user.uid, {
        firstname: this.firstname,
        lastname: this.lastname,
        profilePicture: this.profilePicture || ''
      });

      this.simulateSave(() => {
        this.originalProfile = {
          firstname: this.firstname,
          lastname: this.lastname
        };
        this.profileChanged = false;
      });
    } catch (err) {
      console.error('Failed to save profile', err);
    }
  }


  startChangePassword() {
    this.changePasswordStep = 1;
    this.currentPassword = '';
    this.verificationError = '';
    this.isVerifying = false;
  }

  onCurrentPasswordInput() {
    this.verificationError = '';
  }

  async verifyCurrentPassword() {
    this.isVerifying = true;
    this.verificationError = '';

    try {
      const user = await this.afAuth.currentUser;
      if (!user || !user.email) throw new Error('No user logged in');
      const credential = await this.afAuth.signInWithEmailAndPassword(user.email, this.currentPassword);

      this.isVerifying = false;
      if (credential.user) {
        this.changePasswordStep = 2;
        this.newPassword = '';
        this.confirmPassword = '';
        this.isNewPasswordValid = true;
        this.isConfirmPasswordValid = true;
      }
    } catch (error) {
      this.isVerifying = false;
      this.verificationError = 'Incorrect current password.';
    }
  }

  togglePassword(field: 'new' | 'confirm') {
    if (field === 'new') this.showNewPassword = !this.showNewPassword;
    else this.showConfirmPassword = !this.showConfirmPassword;
  }

  validateNewPassword() {
    this.isNewPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(this.newPassword);
    if (this.confirmPassword) this.validateConfirmPassword();
  }

  validateConfirmPassword() {
    this.isConfirmPasswordValid = this.newPassword === this.confirmPassword;
  }

  async saveNewPassword() {
    if (!this.isNewPasswordValid || !this.isConfirmPasswordValid) return;

    try {
      const user = await this.afAuth.currentUser;
      if (!user) throw new Error('No user found');
      await user.updatePassword(this.newPassword);
      this.simulateSave(() => this.resetPasswordChange());
    } catch (err) {
      console.error('Error updating password', err);
    }
  }

  resetPasswordChange() {
    this.changePasswordStep = 0;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.verificationError = '';
  }

  openStaticPicModal() {
    this.showStaticPicModal = true;
  }

  closeStaticPicModal() {
    this.showStaticPicModal = false;
  }

  selectStaticPicture(pic: string) {
    this.profilePicture = pic;
    this.profileChanged = true;
    this.closeStaticPicModal();
  }
}
