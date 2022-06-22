/**
 * Renders a login form for users to enter their Username and Password.
 * @module UserLoginFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// This imorts the routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
     * The input userData is empty strings by default.
     * This is updated when the user types into the form fields.
     */
  @Input() userData = { Name: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  /**
   * This is the function responsible for sending the form inputs to the backend
   * Attempts to log the user in with the input credentials.
   * Uses [[FetchApiDataService.userLogin]].
   * Saves Username and token in localStorage and redirects to `/movies` upon successful login.
   * Gives a snackbar message if login fails.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        this.dialogRef.close(); // Close the modal on success!
        this.snackBar.open('user logged in successfully!', 'OK', {
          duration: 2000,
        });
        // console.log(response);
        localStorage.setItem('user', response.user.Name);
        localStorage.setItem('token', response.token);
        // Redirect to dashboard/movies page
        this.router.navigate(['movies']);
      },
      (response) => {
        // console.log('response-data', response);
        this.snackBar.open('User login failed', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
