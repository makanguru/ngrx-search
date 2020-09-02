import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import * as fromApp from '../../app.reducer';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  isLoading$: Observable<boolean>;
  users: User[];
  private searchTerms = new Subject<string>();

  constructor(
    private userService: UserService,
    private store: Store<{ui: fromApp.State}>
    ) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.store.dispatch({type: 'START_LOADING'})
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    //this.store.subscribe();
    //this.isLoading$ = this.store.map( state => state.ui.isLoading);
    this.searchTerms.pipe(
      // wait 1 second after each keystroke before considering the term
      debounceTime(1000),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.userService.searchUsers(term))
      ).subscribe(vl => {
        this.users = vl['items'];
        console.log(this.users);
        this.store.dispatch({type: 'STOP_LOADING'})
  })



  }

}
