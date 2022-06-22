/**
 * Renders a form for users to delete their account permanently.
 * @module DeleteUserComponent
 */

import { Component, OnInit } from '@angular/core';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  /**
   * Deletes the logged in users account. Uses a window.confirm to confirm that the user
   * wants to delete their account.
   * Deletes the account with [[FetchApiDataService.deleteUser]].
   * Clears the localStorage and navigates to the welcome page.
   */

  deleteUser(): void {
    this.router.navigate(['welcome']);
    this.fetchApiData.deleteUser().subscribe(
      () => {
        console.log('deleteUser');
      },
      // in case of error, the error will be catched below
      (response) => {
        this.snackBar.open(
          'Your Account has been successfully deleted!',
          'OK',
          {
            duration: 5000,
          }
        );
      }
    );
    localStorage.clear();
  }
}

function user(user: any) {
  throw new Error('Function not implemented.');
}
