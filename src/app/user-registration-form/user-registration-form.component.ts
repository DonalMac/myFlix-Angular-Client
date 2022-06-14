import { Component, OnInit, Input } from '@angular/core';

// This import brings in the API we'll use to register a user
import { UserRegistrationService } from '../fetch-api-data.service';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Name: '', Password: '', Email: '', Birthday: '' };

  /**
   *
   * @param dialogRef
   * @param fetchApiData
   * @param snackBar
   */

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  // This is the function responsible for sending the form inputs to the backend
  /**
   * Function responsible for sending the form inputs to the backend to create a new user
   * @returns alert indicating successfull registration or an error message
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // Close the modal on success!
        console.log('response-data', response);
        this.snackBar.open('user registered successfully!', 'OK', {
          duration: 3000,
        });
      },
      (response) => {
        console.log('response-data', response);
        this.snackBar.open(response, 'OK', {
          duration: 3000,
        });
      }
    );
  }
}
