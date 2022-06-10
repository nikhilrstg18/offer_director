import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _fireAuth: AngularFireAuth, private _router: Router) {}

  loginWithEmailAndPassword(email: string, password: string) {
    this._fireAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        if (res.user?.emailVerified) {
          this._router.navigate(['navigation', 'home']);
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
}
