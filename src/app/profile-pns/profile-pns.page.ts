import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-pns',
  templateUrl: './profile-pns.page.html',
  styleUrls: ['./profile-pns.page.scss'],
  standalone: false,
})
export class ProfilePnsPage implements OnInit {
  firstname: string = 'John';
  lastname: string = 'Doe';
  contactNumber: string = '09559374537';
  address: string = '123 Sample St';
  email: string = 'johndoe@gmail.com';

  originalProfile = {
    firstname: this.firstname,
    lastname: this.lastname,
    contactNumber: this.contactNumber,
    address: this.address,
  };
  profileChanged: boolean = false;

  profilePicture: string | null = null;

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  changePasswordStep: number = 0;

  isNewPasswordValid: boolean = true;
  isConfirmPasswordValid: boolean = true;

  isVerifying: boolean = false;
  verificationError: string = '';

  showSaveModal: boolean = false;
  saveAction: 'profile' | 'password' | null = null;

  isSaving: boolean = false;
  showSuccessPopup: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  onProfileChange() {
    this.profileChanged =
      this.firstname !== this.originalProfile.firstname ||
      this.lastname !== this.originalProfile.lastname ||
      this.contactNumber !== this.originalProfile.contactNumber ||
      this.address !== this.originalProfile.address;
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
    if (this.saveAction === 'profile') {
      this.saveProfile();
    } else if (this.saveAction === 'password') {
      this.saveNewPassword();
    }
    this.closeSaveCard();
  }

  simulateSave(successCallback: () => void) {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this.showSuccessPopup = true;
      successCallback();
      // Auto dismiss success popup after 1 second
      setTimeout(() => {
        this.showSuccessPopup = false;
      }, 1000);
    }, 1500);
  }

  saveProfile() {
    this.simulateSave(() => {
      this.originalProfile = {
        firstname: this.firstname,
        lastname: this.lastname,
        contactNumber: this.contactNumber,
        address: this.address,
      };
      this.profileChanged = false;
    });
  }

  togglePassword(field: string): void {
    if (field === 'new') this.showNewPassword = !this.showNewPassword;
    else if (field === 'confirm') this.showConfirmPassword = !this.showConfirmPassword;
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

  onProfileBlur(field: 'firstname' | 'lastname' | 'contactNumber' | 'address') {
    if (!this.profileChanged) {
      switch (field) {
        case 'firstname':
          if (this.firstname !== this.originalProfile.firstname) {
            this.firstname = this.originalProfile.firstname;
          }
          break;
        case 'lastname':
          if (this.lastname !== this.originalProfile.lastname) {
            this.lastname = this.originalProfile.lastname;
          }
          break;
        case 'contactNumber':
          if (this.contactNumber !== this.originalProfile.contactNumber) {
            this.contactNumber = this.originalProfile.contactNumber;
          }
          break;
        case 'address':
          if (this.address !== this.originalProfile.address) {
            this.address = this.originalProfile.address;
          }
          break;
      }
    }
    this.onProfileChange();
  }

  onCurrentPasswordBlur() {
    if (this.changePasswordStep === 1 && !this.isVerifying && this.currentPassword.length > 0) {
      this.currentPassword = '';
      this.verificationError = '';
      this.changePasswordStep = 0;
    }
  }

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

  validateNewPassword(): void {
    const pwd = this.newPassword;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    this.isNewPasswordValid = regex.test(pwd);

    if (this.confirmPassword) this.validateConfirmPassword();
  }

  validateConfirmPassword(): void {
    this.isConfirmPasswordValid = this.newPassword === this.confirmPassword;
  }

  saveNewPassword() {
    if (!this.isNewPasswordValid) {
      alert('New password does not meet requirements.');
      return;
    }
    if (!this.isConfirmPasswordValid) {
      alert('Confirm password does not match new password.');
      return;
    }

    this.simulateSave(() => {
      this.resetPasswordChange();
    });
  }

  resetPasswordChange() {
    this.changePasswordStep = 0;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.verificationError = '';
  }

  goToProfileMethod() {
    this.router.navigate(['/profile']);
  }

  // Profile Picture modal management
  showProfilePicModal: boolean = false;
  showRemoveConfirmModal: boolean = false;

  openProfilePicModal() {
    this.showProfilePicModal = true;
  }

  closeProfilePicModal() {
    this.showProfilePicModal = false;
  }

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

  closeRemoveConfirmModal() {
    this.showRemoveConfirmModal = false;
  }

  confirmRemovePicture() {
    this.profilePicture = null;
    this.closeRemoveConfirmModal();
  }
}
