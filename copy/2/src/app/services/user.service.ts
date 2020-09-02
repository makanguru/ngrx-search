import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;
  private usersUrl = this.baseUrl + '/repositories';

  constructor(
    private http: HttpClient
    ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}`)
      .pipe(catchError(this.handleError<User[]>('getUsers', [])))
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}` ))
    );
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty User array.
      return of([]);
    }



    return this.http.get<User[]>(`${this.usersUrl}?q=${term}`)
      .pipe(
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }


}



