import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/class/user.class';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user!:User;
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.user = this.service.user;
    console.log(this.user);
    
  }

}
