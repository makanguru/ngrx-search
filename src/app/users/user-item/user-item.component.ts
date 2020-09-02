import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User} from '../../models/user';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  user: User;


  displayedColumns: string[] = ['id', 'title'];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService

  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe( user => {
        this.user = user['result'];
      });
  }




}
