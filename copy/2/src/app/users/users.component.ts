import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'language', 'owner'];

  users: User[];
  dataSource: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(res => {
       this.users = res;
       this.dataSource = this.users;
    }
  );
  }




}
