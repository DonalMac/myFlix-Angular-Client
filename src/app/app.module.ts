import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { GenreComponent } from './genre/genre.component';
import { DirectorComponent } from './director/director.component';
import { ProfileComponent } from './profile/profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DescriptionComponent } from './description/description.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';


const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'users', component: ProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    GenreComponent,
    DirectorComponent,
    ProfileComponent,
    NavBarComponent,
    DescriptionComponent,
    DeleteUserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatToolbarModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
