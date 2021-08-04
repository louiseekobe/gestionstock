import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/class/user.class';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!:FormGroup;
  public msg!:string;
  constructor(private fb:FormBuilder, private userService:UserService, private route:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(us:User = {userNom:"",userLogin:"", userPassword:"",userRole:"",userStatut:0 }){
    this.loginForm = this.fb.group({
      userLogin:[us.userLogin, [Validators.required]], 
      userPassword:[us.userPassword, Validators.required]
    })
  }

  public get userLogin(){
    return this.loginForm.get('userLogin');
  }

  public get userPassword(){
    return this.loginForm.get('userPassword');
  }

  public loginUser(){
    this.userService.loginUser(this.loginForm.value).subscribe(result=>{
      this.userService.user = result;
      if(this.userService.user.userStatut != 0){
        this.route.navigate(['accueil'])
      }else{
        this.route.navigate(['password'])
      }
    }, error=>{
      this.msg = "aucun utilisateur n'a ce login et mot de passe"
    })
  }

  public resetLogin(){
    this.loginForm.reset();
  }

}
