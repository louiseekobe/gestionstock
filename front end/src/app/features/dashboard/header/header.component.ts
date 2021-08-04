import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/class/user.class';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user!:User;
  constructor(private service:UserService, private route:Router) { }

  ngOnInit(): void {
    this.user = this.service.user;
  }

  public logOut(){
    this.user = new User();
    this.route.navigate(['..'])
    console.log(this.user);
    
  }

}
