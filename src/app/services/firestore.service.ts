import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public ngFireBase: AngularFireAuth, private firestore: Firestore) { }

  // Register user and add them to Firestore users collection
  async registerUser(email: string, password: string) {
    try {
      const userCredential = await this.ngFireBase.createUserWithEmailAndPassword(email, password);
      
      await this.addUserToDatabase(email, password); 
      return userCredential;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }
  async addUserToDatabase(email: string, password: string) {
    try {
      const userRef = collection(this.firestore, 'users'); 
      await addDoc(userRef, {
        email: email,
        password: password 
      });
      console.log('User added to Firestore successfully');
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
      throw error;  
    }
  }
  async loginUser(email: string, password: string) {
    try {
      return await this.ngFireBase.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}
