import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/class/user.class';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  user!:User;
  fonction:string="";
  constructor(private route:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    console.log(this.user);
    this.fonction = this.user.userRole;  
  }

  public redirection(){
    this.route.navigate(['../accueil/approvisionnement'])
  }

  public redirection1(){
    this.route.navigate(['../accueil/vente'])
  }

}
