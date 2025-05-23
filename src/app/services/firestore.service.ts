import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(
    public ngFireBase: AngularFireAuth,
    private firestore: Firestore
  ) {}

  // ✅ Register a new user and store user data in Firestore
  async registerUser(email: string, password: string) {
    const userCredential = await this.ngFireBase.createUserWithEmailAndPassword(email, password);
    await this.addUserToDatabase(email, password);
    return userCredential;
  }

  // ✅ Add user document to Firestore
  async addUserToDatabase(email: string, password: string) {
    const userRef = collection(this.firestore, 'users');
    return await addDoc(userRef, {
      email,
      password,
      usertype: 'user'
    });
  }

  // ✅ Login and fetch user type from Firestore
  async loginUser(email: string, password: string) {
    const userCredential = await this.ngFireBase.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (user) {
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

      localStorage.setItem(
        'user',
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          usertype: usertype
        })
      );

      return { userCredential, usertype };
    }

    return null;
  }

  // ✅ Logout and clear local storage
  async logoutUser() {
    await this.ngFireBase.signOut();
    localStorage.removeItem('user');
  }

  // ✅ Add room with image path or external URL
  async addRoom(roomData: {
    availability: boolean;
    image: string;
    name: string;
    price: number;
    tenants: string[];
    type: string;
  }) {
    const roomRef = collection(this.firestore, 'room');
    return await addDoc(roomRef, roomData);
  }
}
