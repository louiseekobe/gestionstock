import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/class/user.class';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-vendeur',
  templateUrl: './vendeur.component.html',
  styleUrls: ['./vendeur.component.scss']
})
export class VendeurComponent implements OnInit {
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
    if(this.fonction == "vendeur" ){
      this.route.navigate(['../accueil/client'])
    }
  }

  public redirection1(){
    if(this.fonction == "vendeur" ){
      this.route.navigate(['../accueil/commande/client'])
    }
    
  }

}
