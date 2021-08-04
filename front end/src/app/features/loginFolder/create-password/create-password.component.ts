import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/class/user.class';
import { UserService } from 'src/app/shared/service/user.service';




@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit{

  public msg!:string;
  public user!:any;
  public n1="";
  public n2 = "";
  public rep = true;
  @ViewChild('confirmation', {static: true}) public confirmpassword!:ElementRef<HTMLInputElement>;
  @ViewChild('password', {static: true}) public password!:ElementRef<HTMLInputElement>;
  
  constructor(private fb:FormBuilder, private userService:UserService, private route:Router) { }

  ngOnInit(): void {
    this.user = this.userService.user
  }

  public submit():boolean{
    this.n1 = this.password.nativeElement.value;
    this.n2 = this.confirmpassword.nativeElement.value;
    if (this.n1 !== "" && this.n2 !== ""){
      if(this.n1 === this.n2){
        return true;
      }
      return false;
    }else{
      return false;
    }
    
  }

  public onsubmit(){
   this.rep = this.submit();
    if(this.rep && this.user){
      this.user.userPassword = this.n1;
      this.user.userStatut = 1;
      console.log(this.user); 
      this.userService.editUser(this.user.userId, this.user).subscribe(data=>{
        this.route.navigate([".."])
      }) 
    }else{
      console.log(this.rep); 
    }
  }

  public reset(){
    this.password.nativeElement.value = "";
    this.confirmpassword.nativeElement.value = "";
  }



}
