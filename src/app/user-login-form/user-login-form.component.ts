import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Name: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        // Logic for a successful user login goes here! (To be implemented)
        this.dialogRef.close(); // Close the modal on success!
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('token', JSON.stringify(response.token));
        this.snackBar.open('user logged in successfully!', 'OK', {
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
