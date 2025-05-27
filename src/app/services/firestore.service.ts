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
  doc,
  getDoc,
} from '@angular/fire/firestore';

export interface Room {
  id: string;
  name: string;
  price: number;
  type: string;
  image: string;
  availability: boolean;
  tenants: string[];
}

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(public ngFireBase: AngularFireAuth, private firestore: Firestore) {}

  // Register user and save to Firestore
  async registerUser(email: string, password: string) {
    const userCredential = await this.ngFireBase.createUserWithEmailAndPassword(
      email,
      password
    );
    await this.addUserToDatabase(email, password);
    return userCredential;
  }

  // Add user data to Firestore
  async addUserToDatabase(email: string, password: string) {
    const userRef = collection(this.firestore, 'users');
    return await addDoc(userRef, {
      email,
      password,
      usertype: 'user',
    });
  }

  // Login and fetch user type
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
          usertype: usertype,
        })
      );

      return { userCredential, usertype };
    }

    return null;
  }

  // Logout
  async logoutUser() {
    await this.ngFireBase.signOut();
    localStorage.removeItem('user');
  }

  // Add a new room
  async addRoom(roomData: {
    availability: boolean;
    image: string;
    name: string;
    price: number;
    tenants: string[];
    type: string;
  }) {
    const roomRef = collection(this.firestore, 'room'); // Collection is 'room'
    return await addDoc(roomRef, roomData);
  }

  // Get all rooms
  async getAllRooms(): Promise<Room[]> {
    const roomsCol = collection(this.firestore, 'room');
    const roomSnapshot = await getDocs(roomsCol);

    const rooms: Room[] = roomSnapshot.docs.map((docSnap) => {
      const data = docSnap.data() as Omit<Room, 'id'>;
      return {
        id: docSnap.id,
        ...data,
      };
    });

    console.log('Fetched rooms:', rooms);
    return rooms;
  }

  // Get available rooms only (filtered server-side)
  async getAvailableRooms(): Promise<Room[]> {
    const roomsCol = collection(this.firestore, 'room');
    const q = query(roomsCol, where('availability', '==', true));
    const roomSnapshot = await getDocs(q);

    return roomSnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Room, 'id'>),
    }));
  }

  // Get rooms by type and availability (filtered server-side)
  async getRoomsByType(type: string): Promise<Room[]> {
    const roomsCol = collection(this.firestore, 'room');
    let q;

    if (type) {
      q = query(roomsCol, where('availability', '==', true), where('type', '==', type));
    } else {
      q = query(roomsCol, where('availability', '==', true));
    }

    const roomSnapshot = await getDocs(q);

    return roomSnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Room, 'id'>),
    }));
  }

  // Delete a room by ID
  async deleteRoom(roomId: string) {
    const roomDoc = doc(this.firestore, 'room', roomId);
    return await deleteDoc(roomDoc);
  }

  async getRoomById(roomId: string): Promise<Room | null> {
    const roomDocRef = doc(this.firestore, 'room', roomId);
    const roomSnap = await getDoc(roomDocRef);
    if (roomSnap.exists()) {
      return {
        id: roomSnap.id,
        ...(roomSnap.data() as Omit<Room, 'id'>),
      };
    }
    return null;
  }

}
