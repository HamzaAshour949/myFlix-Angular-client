import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://jonathlonmovieapp.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {  }

 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

// Making the api call for the user login endpoint
public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails ).pipe(
      catchError(this.handleError)
    );
  }

// Making the api call for the get all movies endpoint
getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Making the api call for the get single movie endpoint
getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Making the api call for the get director endpoint
getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Making the api call for the get genre endpoint
getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Making the api call for the get user endpoint
getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Making the api call for the get favourite movies for a user endpoint
getFavouriteMovies(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

// Making the api call for the add a movie to favourite Movies endpoint
addFavouriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(token);

    return this.http.post(apiUrl + "users/" + username + "/movies/" + movieId,
        {},
        {
          headers: new HttpHeaders({
            Authorization: "Bearer " + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the delete a movie from the favorite movies endpoint
deleteFavouriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Making the api call for the edit user endpoint
editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Making the api call for the delete user endpoint
deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text'
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }



// Non-typed response extraction
private extractResponseData(res: any): any {
    const body = res;
    return body || { };
}


private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
