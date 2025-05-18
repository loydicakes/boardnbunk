import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { query, where, getDocs, Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public ngFireBase: AngularFireAuth, private firestore: Firestore) {}

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
        password: password,
        usertype: 'user'  
      });
      console.log('User added to Firestore successfully');
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
      throw error;  
    }
  }

async loginUser(email: string, password: string) {
  try {
      const userCredential = await this.ngFireBase.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        // 🔍 Query the users collection
        const usersRef = collection(this.firestore, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        let usertype = 'user';
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data['usertype']) {
            usertype = data['usertype'];
          }
        });

        // 💾 Save to localStorage
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          usertype: usertype
        }));

        return { userCredential, usertype }; // return usertype too
      }

      return null;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logoutUser() {
    try {
      await this.ngFireBase.signOut();
      localStorage.removeItem('user');
      console.log('Logged out');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // ✅ Add Room
  async addRoom(roomData: {
    availability: boolean;
    image: string;
    name: string;
    price: number;
    tenants: string[];
    type: string;
  }) {
    try {
      const roomRef = collection(this.firestore, 'room');
      const docRef = await addDoc(roomRef, roomData);
      console.log('Room added with ID:', docRef.id);
      return docRef;
    } catch (error) {
      console.error('Error adding room:', error);
      throw error;
    }
  }
}
