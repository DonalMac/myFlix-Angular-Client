/**
 * The landing page for users who are not logged in.
 * Renders buttons to allow login or registration.
 * @module WelcomePageComponent
 */
import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
  * This function will open the dialog when the signup button is clicked
  * Opens a dialog with the [[UserRegistrationFormComponent]]
  */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '400px'
    });
  }

  /**
 * If the user is already logged in, they should have a valid JWT saved in localStorage already.
 * This function checks first for a JWT. If it's found, user is redirected to the movie card page.
 *
 * Otherwise, the login dialog should open.
 *
 * If the user has a JWT saved but it is invalid for some reason, the movie card page will find out when
 * trying to get the movie data and the user will be logged out.
 * This function will open the dialog when the signin button is clicked
 */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '400px'
    });
  }
}