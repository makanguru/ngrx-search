import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { State } from '../shared/ui.reducer'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'language', 'owner'];

  users: User[];
  dataSource: User[];

  constructor(
    private userService: UserService,
    private store: Store<State> ) { }

  ngOnInit(): void {
    this.store.select('home').subscribe( b => console.log(88888888, b))
  }





}
