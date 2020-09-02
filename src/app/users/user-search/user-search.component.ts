import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import * as fromApp from '../../shared/ui.reducer';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  users: User[];
  loaded = false;
  private searchTerms = new Subject<string>();

  constructor(
    private userService: UserService,
    private store: Store<fromApp.State>
    ) {


    }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.store.dispatch({type: 'START_LOADING'});
    this.searchTerms.next(term);
    this.loaded = true;
    this.store.dispatch({type: 'STOP_LOADING'});
  }

  ngOnInit(): void {

    this.isLoading$ = this.store.pipe(select(a => a.isLoading));


    this.searchTerms.pipe(
      // wait 1 second after each keystroke before considering the term
      debounceTime(1000),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.userService.searchUsers(term))
      ).subscribe(vl => {
        this.users = vl['items'];
        this.loaded = false;

        console.log(this.users);
        this.store.dispatch({type: 'READ_DATA', requestToGit: this.users} )
      })

  }

  ngOnDestroy() {
    this.searchTerms.unsubscribe();
  }


}
