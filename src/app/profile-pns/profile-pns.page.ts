import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-pns',
  templateUrl: './profile-pns.page.html',
  styleUrls: ['./profile-pns.page.scss'],
  standalone: false,
})
export class ProfilePnsPage implements OnInit {
  // Profile fields
  firstname: string = 'John';
  lastname: string = 'Doe';
  contactNumber: string = '09559374537';
  address: string = '123 Sample St';
  email: string = 'johndoe@gmail.com'; // readonly

  // Profile Picture base64 string or URL
  profilePicture: string | null = null;

  // Password input values
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // Visibility toggles
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Dropdown toggle for Change Password
  changePasswordDropdownOpen: boolean = false;

  // Validation flags
  isNewPasswordValid: boolean = true;
  isConfirmPasswordValid: boolean = true;

  // Modal visibility states
  showSaveModal: boolean = false;
  showProfilePicModal: boolean = false;
  showRemoveConfirmModal: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  togglePassword(field: string): void {
    switch (field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  toggleChangePasswordDropdown(): void {
    this.changePasswordDropdownOpen = !this.changePasswordDropdownOpen;

    if (!this.changePasswordDropdownOpen) {
      this.newPassword = '';
      this.confirmPassword = '';
      this.isNewPasswordValid = true;
      this.isConfirmPasswordValid = true;
    }
  }

  validateNewPassword(): void {
    const pwd = this.newPassword;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    this.isNewPasswordValid = regex.test(pwd);

    if (this.confirmPassword) {
      this.validateConfirmPassword();
    }
  }

  validateConfirmPassword(): void {
    this.isConfirmPasswordValid = this.newPassword === this.confirmPassword;
  }

  goToProfileMethod() {
    this.router.navigate(['/profile']);
  }

  // Save modal controls
  showSaveCard() {
    this.showSaveModal = true;
  }

  closeSaveCard() {
    this.showSaveModal = false;
  }

  confirmSave() {
    if (this.changePasswordDropdownOpen) {
      if (!this.isNewPasswordValid) {
        alert('New password does not meet requirements.');
        return;
      }
      if (!this.isConfirmPasswordValid) {
        alert('Confirm password does not match new password.');
        return;
      }
    }

    this.closeSaveCard();

    // TODO: Save profile info & passwords here

    console.log('Saved data:', {
      firstname: this.firstname,
      lastname: this.lastname,
      contactNumber: this.contactNumber,
      address: this.address,
      email: this.email,
      profilePicture: this.profilePicture,
      currentPassword: this.currentPassword,
      newPassword: this.changePasswordDropdownOpen ? this.newPassword : null,
    });
  }

  // Profile Picture modal controls
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
      fileInput.value = ''; // reset so same file can be picked again
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture = e.target.result; // base64 image string
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove confirmation modal controls
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
