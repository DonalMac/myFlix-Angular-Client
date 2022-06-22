/**
 * Renders a responsive grid of movie cards for each movie in the database. Each movie card has an image, links to open dialogs for
 * genre, director, and description components, and a toggle button to add or remove a movie from the users favorite movie list.
 *
 * Also renders a NavBarComponent.
 *
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }
  favourites: any = [];
  ngOnInit(): void {
    this.getMovies();
    this.getFavouriteMovies();
  }

  /**
   * @param id string containing the ID of a movie to be added to the users list of favorite movies.
   * Adds a movie to a user's list of favorites with a POST request via
   * [[FetchApiDataService.addFavoriteMovie]].
   * Then, changes the movie favorite icon from emtpy to filled in and displays a confirmation message.
   */

  addFavoriteToList(movieID: string): void {
    this.fetchApiData.addFavoriteMovie(movieID).subscribe(
      (response: any) => {
        console.log('addFavoriteMovie');
        this.snackBar.open('Movie has been successfully added!', '', {
          duration: 5000,
        });
      },
      // in case of error, the error will be caught below
      (response: any) => {
        this.snackBar.open(
          'Sorry, something went wrong. Please, try it again!',
          'OK',
          {
            duration: 5000,
          }
        );
      }
    );
    this.ngOnInit();
  }

  /**
   * @param id string containing the ID of a movie to be removed from the users list of favorite movies.
   * Removes a movie from a users list of favorites with a DELETE request via
   * [[FetchApiDataService.removeFavoriteMovie]].
   * Then, changes the movie favorite icon from filled in to empty and displays a confirmation message.
   */

  removeFavoriteFromList(movieID: any): void {
    this.fetchApiData.removeFavoriteMovie(movieID).subscribe(
      (response: any) => {
        this.snackBar.open('Movie has been removed!', '', {
          duration: 5000,
        });
      },
      // in case of error, the error will be catched below
      (response: any) => {
        this.snackBar.open(
          'Sorry, something went wrong. Please, try it again!',
          'OK',
          {
            duration: 5000,
          }
        );
      }
    );
    this.ngOnInit();
  }

  /**
  * Fetches the logged in users favorite movies from the server.
  * This function is called from [[MovieCardComponent.getMovies]].
  */
  getFavouriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favourites = resp.FavoriteMovies;
    });
  }

  /**
   * Sets the isFavorite attribute of each movie to true or false.
   * This is called after fetching the favorites with [[MovieCardComponent.getFavoriteMovies]]
   * from within [[MovieCardComponent.getMovies]].
   */

  isFavorite(movieId: string): boolean {
    return this.favourites.some((movie: any) => movie == movieId);
  }

  /**
   * When the user loads the `/movies` page, loads in the movies and renders movie card elements.
   * Then, an array of the users favorite movies by ID is fetched from the server and
   * each movie that is in that list is marked as favorite.
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
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
 * @param Director {Name: <string>, Bio: <string>, BirthYear: <string>}
 * Opens a dialog box with a DirectorComponent, passing the Director data into the component.
 */

  openDirectorDialog(Director: any): void {
    this.dialog.open(DirectorComponent, {
      width: '400px',
      data: { Director },
    });
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
   * this function checks if a favorite movie icon is activated or not by movieID;
   * If a user clicks on a empty icon, a POST request via [[FetchApiDataService.addFavoriteMovie]] is activated.
   * That changes the movie favorite icon from emtpy to filled, set the movieID to the favorite list and a
   * confirmation message will be displayed.
   *
   * If a user clicks on a filled icon, a DELETE request via [[FetchApiDataService.removeFavoriteMovie]] is activated.
   * That changes the movie favorite icon from filled in to empty, removes the movieID to the favorite list and
   * a confirmation message will be displayed.
   */

  toggleFavorite(movieID: string): void {
    this.isFavorite(movieID)
      ? this.removeFavoriteFromList(movieID)
      : this.addFavoriteToList(movieID);
    this.ngOnInit();
  }
}