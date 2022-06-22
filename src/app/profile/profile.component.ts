/**
 * Renders a form for users to update their account information and
 * an array of movie cards corresponding to their favorite movies.
 * Also renders a Nav-BarComponent.
 *
 * @module ProfileComponent
 */

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

  /**
    * Starts the value of each form field as an empty string. When the user types
    * into the field, the updatedUserData is updated as well.
    */

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

  /**
 * Stores data about each movie in the database.
 */
  movies: any[] = [];

  /**
  * A subset of movies containing only the user's favorites.
  */
  userFavouritesMovies: any[] = [];

  /**
    * Fetches data for the logged in user.
    * Then, downloads all the movie data and maps the user's favorites to favoriteMovies.
    *
    * If the API call fails for some reason, the user will be logged out and returned to the welcome screen.
    */

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
  }

  /**
   * @param id string containing the ID of a movie to be removed from the users favorite movies list.
   * Removes a movie from a users list of favorites with a DELETE request via
   * [[FetchApiDataService.removeFavoriteMovie]].
   * Then, reloads the profile page, resulting in the removed movie disappearing
   */

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

  /**
   * Downloads all the movie data and saves into this.movies.
   * Then, filter out the favorites and save into this.favoriteMovies.
   */

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

  /**
   * @param movie {Title: <string>, Summary: <string>, ... }
   * Opens a dialog box with a DescriptionComponent, passing the movie data into the component.
   */

  openDescriptionDialog(movie: any): void {
    this.dialog.open(DescriptionComponent, {
      width: '400px',
      data: { movie },
    });
  }

  /**
  * @param Genre {Name: <string>, Description: <string>}
  * Opens a dialog box with a GenreComponent, passing the Genre data into the component.
  */

  openGenreDialog(Genre: any): void {
    this.dialog.open(GenreComponent, {
      width: '400px',
      data: { Genre },
    });
  }

  /**
 * @param Director {Name: <string>, Bio: <string>, Birth: <string>, Deth: <string>}
 * Opens a dialog box with a DirectorComponent, passing the Director  data into the component.
 */

  openDirectorDialog(Director: any): void {
    this.dialog.open(DirectorComponent, {
      width: '400px',
      data: { Director },
    });
  }

  /**
  * When user clicks on Delete Account Button, a window.confirm to confirm that the user
  * wants to delete their account opens up. The user get two buttons to choose from
  * Quit request or confirm to delete the users account.
  */

  openDialog() {
    this.dialog.open(DeleteUserComponent);
  }

  /**
  * API call to get data for a user.
  * Pulls token from localStorage.
  * @returns object containing data for one user.
  * {[  _id: <string>,
  *     Name: <string>,
  *     Password: <string> (hashed),
  *     Email: <string>,
  *     Birthday: <string>
  *     FavoriteMovies: [<string>]
  * ]}
  */

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.userData.Name = resp.Name;
      this.userData.Email = resp.Email;
      this.userData.Birthday = formatDate(resp.Birthday, 'yyyy-MM-dd', 'en_US');
      this.userData.FavoriteMovies = resp.FavoriteMovies;
      return this.userData;
    });
  }

  /**
 * Updates the user's data. Only sends data to the server for fields that have been filled in.
 * If the data is formatted poorly, the error from the server should trigger a warning message
 * to the user to check their data format.
 */

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