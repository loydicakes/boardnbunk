// profile-pns.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-profile-pns',
  templateUrl: './profile-pns.page.html',
  styleUrls: ['./profile-pns.page.scss'],
})
export class ProfilePnsPage implements OnInit {
  firstname = 'John';
  lastname = 'Doe';
  contactNumber = '09559374537';
  address = '123 Sample St';
  email = 'johndoe@gmail.com';

  profilePicture: string | null = null;
  originalProfile = { firstname: this.firstname, lastname: this.lastname, contactNumber: this.contactNumber, address: this.address };
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
  saveAction: 'profile' | 'password' | null = null;

  isSaving = false;
  showSuccessPopup = false;

  showProfilePicModal = false;
  showRemoveConfirmModal = false;

  constructor(private router: Router) {}
  ngOnInit() {}

  goToProfileMethod() { this.router.navigate(['/profile']); }

  onProfileChange() {
    this.profileChanged = this.firstname !== this.originalProfile.firstname || this.lastname !== this.originalProfile.lastname || this.contactNumber !== this.originalProfile.contactNumber || this.address !== this.originalProfile.address;
  }

  onProfileBlur(field: keyof typeof this.originalProfile) {
    if (!this.profileChanged) this[field] = this.originalProfile[field];
    this.onProfileChange();
  }

  confirmSave(action: 'profile' | 'password') { this.saveAction = action; this.showSaveModal = true; }
  closeSaveCard() { this.showSaveModal = false; this.saveAction = null; }
  confirmSaveAction() { if (this.saveAction === 'profile') this.saveProfile(); else if (this.saveAction === 'password') this.saveNewPassword(); this.closeSaveCard(); }

  simulateSave(callback: () => void) {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this.showSuccessPopup = true;
      callback();
      setTimeout(() => this.showSuccessPopup = false, 1000);
    }, 1500);
  }

  saveProfile() {
    this.simulateSave(() => {
      this.originalProfile = { firstname: this.firstname, lastname: this.lastname, contactNumber: this.contactNumber, address: this.address };
      this.profileChanged = false;
    });
  }

  startChangePassword() {
    this.changePasswordStep = 1;
    this.currentPassword = '';
    this.verificationError = '';
    this.isVerifying = false;
  }

  onCurrentPasswordInput() { this.verificationError = ''; }

  verifyCurrentPassword() {
    this.isVerifying = true;
    this.verificationError = '';
    setTimeout(() => {
      this.isVerifying = false;
      if (this.currentPassword === 'correct_password') {
        this.changePasswordStep = 2;
        this.newPassword = '';
        this.confirmPassword = '';
        this.isNewPasswordValid = true;
        this.isConfirmPasswordValid = true;
      } else {
        this.verificationError = 'Incorrect current password.';
      }
    }, 1000);
  }

  togglePassword(field: 'new' | 'confirm') {
    if (field === 'new') this.showNewPassword = !this.showNewPassword;
    else this.showConfirmPassword = !this.showConfirmPassword;
  }

  validateNewPassword() {
    this.isNewPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(this.newPassword);
    if (this.confirmPassword) this.validateConfirmPassword();
  }

  validateConfirmPassword() { this.isConfirmPasswordValid = this.newPassword === this.confirmPassword; }

  saveNewPassword() {
    if (!this.isNewPasswordValid || !this.isConfirmPasswordValid) return;
    this.simulateSave(() => this.resetPasswordChange());
  }

  resetPasswordChange() {
    this.changePasswordStep = 0;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.verificationError = '';
  }

  openProfilePicModal() { this.showProfilePicModal = true; }
  closeProfilePicModal() { this.showProfilePicModal = false; }

  chooseNewPicture() {
    this.closeProfilePicModal();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  openRemoveConfirmModal() {
    this.closeProfilePicModal();
    this.showRemoveConfirmModal = true;
  }

  closeRemoveConfirmModal() { this.showRemoveConfirmModal = false; }

  confirmRemovePicture() {
    this.profilePicture = null;
    this.closeRemoveConfirmModal();
  }
}
