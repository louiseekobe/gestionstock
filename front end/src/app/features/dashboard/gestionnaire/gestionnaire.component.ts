import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/class/user.class';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-gestionnaire',
  templateUrl: './gestionnaire.component.html',
  styleUrls: ['./gestionnaire.component.scss']
})
export class GestionnaireComponent implements OnInit {
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
    if(this.fonction == "gestionnaire" ){
      this.route.navigate(['../accueil/fournisseur'])
    }
    
  }

  public redirection1(){
    if(this.fonction == "gestionnaire" ){
      this.route.navigate(['../accueil/commande/fournisseur'])
    }
    
  }
  public redirection2(){
    if(this.fonction == "gestionnaire" ){
      this.route.navigate(['../accueil/categorie'])
    }
    
  }
  public redirection3(){
    if(this.fonction == "gestionnaire" ){
      this.route.navigate(['../accueil/produit'])
    }
  }

}
