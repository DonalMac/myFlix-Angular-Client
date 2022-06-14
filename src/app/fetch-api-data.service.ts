import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://mac-myflix.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log('userDetails', userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log('userDetails', userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the get all movies endpoint
  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(catchError(this.handleError));
  }

  // Making the api call for the get one movie endpoint
  public getOneMovie(title: any): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/title/' + title)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the get director endpoint
  public getDirector(director: any): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/director/' + director)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the get genre endpoint
  public getGenre(genre: any): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/genre/' + genre)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the get user endpoint
  public getUser(username: any): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the get favorite movies for a user endpoint
  public getFavoriteMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'users/username/movies')
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the add a movie to favorite movies endpoint
  public addFavoriteMovie(movie: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users/username/movies/' + movie, movie)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the edit user endpoint
  public editUser(username: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + username, username)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the delete user endpoint
  public deleteUser(username: any): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the delete a movie from favorite movies endpoint
  public deleteFavoriteMovie(movie: any): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/username/movies' + movie)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
