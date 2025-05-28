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
  setDoc,
  Timestamp
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

  // Register user and save profile info (firstname, lastname, email) to Firestore under users/{uid}
  async registerUser(email: string, password: string, firstname: string, lastname: string) {
    const userCredential = await this.ngFireBase.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (user) {
      const userRef = doc(this.firestore, 'users', user.uid);
      await setDoc(userRef, {
        email,
        firstname,
        lastname,
        usertype: 'user',
        createdAt: new Date()
      });
    }
    return userCredential;
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
    const roomRef = collection(this.firestore, 'room');
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

  async getAllUsers() {
    const usersCol = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersCol);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        firstname: data['firstname'],
        lastname: data['lastname'],
        email: data['email']
      };
    });
  }

  // Add a request document with user full name and datetime
  async addRequest(name: string, datentime: Date) {
    const requestRef = collection(this.firestore, 'request');
    return await addDoc(requestRef, {
      name,
      datentime: Timestamp.fromDate(datentime)
    });
  }

  // Check if user has already requested
  async hasUserRequested(fullName: string): Promise<boolean> {
    const requestsCol = collection(this.firestore, 'request');
    const q = query(requestsCol, where('name', '==', fullName));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }
}
