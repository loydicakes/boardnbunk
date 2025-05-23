import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  getDocs, 
  deleteDoc,
  doc
} from '@angular/fire/firestore';

interface Room {
  id: string;
  name: string;
  price: number;
  type: string;
  image: string;
  availability: boolean;
  tenants: string[]; // ✅ required
}
@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(
    public ngFireBase: AngularFireAuth,
    private firestore: Firestore
  ) {}

  async registerUser(email: string, password: string) {
    const userCredential = await this.ngFireBase.createUserWithEmailAndPassword(email, password);
    await this.addUserToDatabase(email, password);
    return userCredential;
  }

  async addUserToDatabase(email: string, password: string) {
    const userRef = collection(this.firestore, 'users');
    return await addDoc(userRef, {
      email,
      password,
      usertype: 'user'
    });
  }

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

  async logoutUser() {
    await this.ngFireBase.signOut();
    localStorage.removeItem('user');
  }

  async addRoom(roomData: {
    availability: boolean;
    image: string;
    name: string;
    price: number;
    tenants: string[];
    type: string;
  }) {
    const roomRef = collection(this.firestore, 'room'); // ✅ fixed here (was 'room')
    return await addDoc(roomRef, roomData);
  }

  async getAllRooms(): Promise<Room[]> {
    const roomsCol = collection(this.firestore, 'room');
    const roomSnapshot = await getDocs(roomsCol);

    const rooms: Room[] = roomSnapshot.docs.map(docSnap => {
      const data = docSnap.data() as Omit<Room, 'id'>;
      return {
        id: docSnap.id,
        ...data
      };
    });
    console.log('Fetched rooms:', rooms);
    return rooms;
  }

  async deleteRoom(roomId: string) {
    const roomDoc = doc(this.firestore, 'room', roomId); // ✅ fixed here too
    return await deleteDoc(roomDoc);
  }
}
