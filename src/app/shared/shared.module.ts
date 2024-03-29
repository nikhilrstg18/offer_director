import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ForgetComponent } from './components/forget/forget.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { IndCurrencyPipe } from './pipes/ind-currency.pipe';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    IndCurrencyPipe,
    ForgetComponent,
    VerifyComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  exports: [
    LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    AngularFireModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
  ],
  // no providers here
})
export class SharedModule {
  public static root() {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        IndCurrencyPipe,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
      ],
    };
  }
}
