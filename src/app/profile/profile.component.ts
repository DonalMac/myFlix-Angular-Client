import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() userData = {
    Name: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: [],
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  movies: any[] = [];
  userFavouritesMovies: any[] = [];

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
  }

  removeFavoriteFromList(movieID: any): void {
    this.fetchApiData.removeFavoriteMovie(movieID).subscribe(
      (response: any) => {
        this.snackBar.open('Movie has been removed!', 'Ok', {
          duration: 2000,
        });
        this.ngOnInit();
      },
      // in case of error, the error will be catched below
      (response: any) => {
        this.snackBar.open(
          'Sorry, something went wrong. Please, try it again!',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
    this.ngOnInit();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        if (this.userData.FavoriteMovies) {
          this.userFavouritesMovies = this.userData.FavoriteMovies.map(
            (_id: string) => {
              return this.movies.find((movie: any) => {
                return movie._id === _id;
              });
            }
          );
        }
        console.log('this.userFavouritesMovies ', this.userFavouritesMovies);
        console.log('this.movies ', this.movies);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  openDescriptionDialog(movie: any): void {
    this.dialog.open(DescriptionComponent, {
      width: '400px',
      data: { movie },
    });
  }

  openGenreDialog(Genre: any): void {
    this.dialog.open(GenreComponent, {
      width: '400px',
      data: { Genre },
    });
  }

  openDirectorDialog(Director: any): void {
    this.dialog.open(DirectorComponent, {
      width: '400px',
      data: { Director },
    });
  }

  openDialog() {
    this.dialog.open(DeleteUserComponent);
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.userData.Name = resp.Name;
      this.userData.Email = resp.Email;
      this.userData.Birthday = formatDate(resp.Birthday, 'yyyy-MM-dd', 'en_US');
      this.userData.FavoriteMovies = resp.FavoriteMovies;
      return this.userData;
    });
  }

  updateUser(): void {
    this.fetchApiData.updateUserData(this.userData).subscribe(
      (response: any) => {
        localStorage.setItem('name', response.Name);
        // Logic for a successful user update goes here! (To be implemented)
        this.snackBar.open(
          response.Name + ' You have successfully updated your Profile!',
          '',
          {
            duration: 2000,
          }
        );
      },
      // in case of error, the error will be caught below
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}