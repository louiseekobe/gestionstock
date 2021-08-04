import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/class/user.class';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.scss']
})
export class AdministrateurComponent implements OnInit {
  user!:User;
  fonction:string="";
  
  constructor(private route:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    console.log(this.user);
    this.fonction = this.user.userRole;
    console.log(this.fonction); 
  }

  public redirection(){
    if(this.fonction === "administrateur"){
      this.route.navigate(['../accueil/utilisateurs'])
    }
  }

}
