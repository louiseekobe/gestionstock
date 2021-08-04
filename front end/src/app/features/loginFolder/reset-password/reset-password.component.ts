import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/class/user.class';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public loginForm!:FormGroup;
  public msg!:string;
  @ViewChild('confirmation', {static: true}) public confirmpassword!:ElementRef<HTMLInputElement>;

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
    if(this.loginForm.valid){
      if(this.confirmpassword.nativeElement.value === this.loginForm.value.userPassword ){
        this.userService.resetPassword(this.loginForm.value).subscribe(data=>{
          this.route.navigate(['..'])
        }) 
      }else{
        this.msg = "aucun utilisateur avec ce login"
      }
    }
    
  }

  public resetLogin(){
    this.loginForm.reset();
  }
}
