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
  Timestamp,
  collectionData,
  orderBy,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Room {
  id: string;
  name: string;
  price: number;
  type: string;
  image: string;
  availability: boolean;
  tenants: string[];
}

export interface ChatMessage {
  id?: string;
  uid: string;
  name: string;
  content: string;
  timestamp: any;
}

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(public ngFireBase: AngularFireAuth, private firestore: Firestore) { }

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
    const roomRef = collection(this.firestore, 'room');
    return await addDoc(roomRef, roomData);
  }

  async getAllRooms(): Promise<Room[]> {
    const roomsCol = collection(this.firestore, 'room');
    const roomSnapshot = await getDocs(roomsCol);

    return roomSnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Room, 'id'>),
    }));
  }

  async getAvailableRooms(): Promise<Room[]> {
    const roomsCol = collection(this.firestore, 'room');
    const q = query(roomsCol, where('availability', '==', true));
    const roomSnapshot = await getDocs(q);

    return roomSnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Room, 'id'>),
    }));
  }

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

  async addRequest(
    name: string,
    datentime: Date,
    userId: string,
    roomName: string,
    roomType: string,
    paymentMethod: string,
    cardNumber?: string,
    gcashNumber?: string
  ) {
    const requestData: any = {
      name,
      datentime,
      userId,
      roomName,
      roomType,
      paymentMethod
    };

    if (paymentMethod === 'card') {
      requestData.cardNumber = cardNumber;
    } else if (paymentMethod === 'gcash') {
      requestData.gcashNumber = gcashNumber;
    }

    await addDoc(collection(this.firestore, 'request'), requestData);
  }

  async hasUserRequested(fullName: string): Promise<boolean> {
    const requestsCol = collection(this.firestore, 'request');
    const q = query(requestsCol, where('name', '==', fullName));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  async getRequestCount(): Promise<number> {
    const requestsCol = collection(this.firestore, 'request');
    const querySnapshot = await getDocs(requestsCol);
    return querySnapshot.size;
  }

  // ======================= CHAT =======================

  getChatMessages(): Observable<ChatMessage[]> {
    const q = query(collection(this.firestore, 'chat'), orderBy('timestamp'));
    return collectionData(q, { idField: 'id' }) as Observable<ChatMessage[]>;
  }

  // ✅ Updated to use adminId + userId
  async sendChatMessage(userId: string, name: string, content: string, uid: string) {
    const sender = await this.ngFireBase.currentUser;

    if (!userId || !sender) throw new Error('Missing sender or userId');

    const chatRef = collection(this.firestore, 'chat');

    return await addDoc(chatRef, {
      uid,
      name,
      senderUid: sender.uid,
      content,
      timestamp: Timestamp.now()
    });
  }

  async updateUserProfile(uid: string, data: { firstname: string; lastname: string; profilePicture?: string }) {
    const userRef = doc(this.firestore, 'users', uid);  // ✅ 3 segments: 'users', userId
    return await setDoc(userRef, data, { merge: true });
  }

  async getUserProfile(uid: string): Promise<{ firstname: string; lastname: string; email: string; profilePicture?: string }> {
    const userDocRef = doc(this.firestore, 'users', uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      return userSnap.data() as {
        firstname: string;
        lastname: string;
        email: string;
        profilePicture?: string;
      };
    } else {
      throw new Error('User document does not exist');
    }
  }

  async getCollection(path: string) {
    const snapshot = await getDocs(collection(this.firestore, path));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async addDocument(path: string, data: any) {
    return await addDoc(collection(this.firestore, path), data);
  }

  async deleteDocument(path: string, id: string) {
    return await deleteDoc(doc(this.firestore, path, id));
  }

  async updateUserPaymentMethod(uid: string, paymentInfo: {
    paymentMethod: string;
    cardNumber?: string;
    gcashNumber?: string;
  }) {
    const userRef = doc(this.firestore, 'users', uid);
    return await setDoc(userRef, paymentInfo, { merge: true });
  }

  async getDocument(path: string, id: string) {
  const docRef = doc(this.firestore, path, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}


}
