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
  getFavouriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favourites = resp.FavoriteMovies;
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favourites.some((movie: any) => movie == movieId);
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
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
  openDescriptionDialog(movie: any): void {
    this.dialog.open(DescriptionComponent, {
      width: '400px',
      data: { movie },
    });
  }

  toggleFavorite(movieID: string): void {
    this.isFavorite(movieID)
      ? this.removeFavoriteFromList(movieID)
      : this.addFavoriteToList(movieID);
    this.ngOnInit();
  }
}