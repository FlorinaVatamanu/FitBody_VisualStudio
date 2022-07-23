import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserInfo,
} from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth, private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();

        this.afs.doc('/users/' + emailLower)                        // on a successful signup, create a document in 'users' collection with the new user's info
          .set({
            name: user.role,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            role: user.role
          });
      });
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not Authenticated');

        return updateProfile(user, profileData);
      })
    );
  }

  resetPassword(email: string): Promise<any> {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Authentication Service: reset password success');
        // this.router.navigate(['/amount']);
      })
      .catch(error => {
        console.log('Authentication Service: reset password error...');
        console.log(error.code);
        console.log(error)
        if (error.code)
          return error;
      });
  }

  async resendVerificationEmail() {
    const user = await this.afAuth.currentUser; // verification email is sent in the Sign Up function, but if you need to resend, call this function
    if (user) {
      return user.sendEmailVerification()
        .then(() => {
          // this.router.navigate(['home']);
        })
        .catch(error => {
          console.log('Authentication Service: sendVerificationEmail error...');
          console.log('error code', error.code);
          console.log('error', error);
          if (error.code)
            return error;
        });
    }
  }

  logout() {
    return from(this.auth.signOut());
  }

  getCurrentUser() {
    return this.afAuth.currentUser;                                 // returns user object for logged-in users, otherwise returns null
  }
}
