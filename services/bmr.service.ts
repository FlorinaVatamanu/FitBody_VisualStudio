import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from '../models/user-profile';
import { Bmr } from '../models/bmr';

import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class BmrService {
  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService,
    private afs: AngularFirestore
  ) { }

  // add bmr
  addBmr(bmr: Bmr) {
    bmr.id = this.afs.createId();
    return this.afs.collection('/bmr').add(bmr);
  }

  // get all bmr
  getAllBmr() {
    return this.afs.collection('/bmr').snapshotChanges();
  }

  // delete bmr
  deleteBmr(bmr: Bmr) {
    this.afs.doc('/bmr/' + bmr.id).delete();
  }

  // update bmr
  updateBmr(bmr: Bmr) {
    this.deleteBmr(bmr);
    this.addBmr(bmr);
  }

}
