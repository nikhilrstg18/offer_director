import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _fireAuth: AngularFireAuth,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  loginWithEmailAndPassword(email: string, password: string) {
    this._fireAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        if (res.user?.emailVerified) {
          this._router.navigate(['navigation', 'home']);
          this._snackBar.open(`Hi ${email}`, 'Login', {
            duration: 5 * 1000,
          });
        } else {
          this._router.navigate(['/verify']);
        }
      },
      (err) => {
        alert(`[AuthService].[loginWithEmailAndPassword] ${err.message}`);
        this._router.navigate(['/login']);
      }
    );
  }
  registerWithEmailandPassword(email: string, password: string) {
    this._fireAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Registration Successfull');
        this._router.navigate(['/login']);
        this.sendEmailForVerification(res.user);
      },
      (err) => {
        alert(`[AuthService].[registerWithEmailandPassword] ${err.message}`);
        this._router.navigate(['/signup']);
      }
    );
  }
  sendEmailForVerification(
    user: import('firebase/compat').default.User | null
  ) {
    user?.sendEmailVerification().then(
      () => {
        this._router.navigate(['/verify']);
      },
      (err) => {
        alert(`[AuthService].[sendEmailForVerification] ${err.message}`);
      }
    );
  }
  logOut() {
    this._fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this._router.navigate(['/login']);
      },
      (err) => {
        alert(`[AuthService].[logOut] ${err.message}`);
      }
    );
  }

  forgetPassword(email: string) {
    this._fireAuth.sendPasswordResetEmail(email).then(
      (x) => {
        localStorage.setItem('token', (x as any)['uid']);
        this._router.navigate(['/verify']);
      },
      (err) => {
        alert(`[AuthService].[forgetPassword] ${err.message}`);
        this._router.navigate(['/forget']);
      }
    );
  }
  signInWithGoogle() {
    this._fireAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        this._router.navigate(['navigation', 'home']);
        localStorage.setItem('token', JSON.stringify(res.user?.uid));
        this._snackBar.open(`Hi ${res?.user?.displayName}`, 'Login', {
          duration: 5 * 1000,
        });
        //displayName
        // email
        // phoneNumber
        //photoUrl
      },
      (err) => {
        alert(`[AuthService][signInWithGoogle] ${err.message}`);
      }
    );
  }
}
