import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/class/user.class';
import { UserService } from 'src/app/shared/service/user.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  users!:User[];
  closeResult!:string;
  use!:User;
  userForm!:FormGroup;
  mgs!:string;
  id!:number
  
  constructor(private userService:UserService, private modalService: NgbModal, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.userService.listUser().subscribe(result=>{
      this.users = result;
    })
    this.initForm();
  }


  //open content modal
  public open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //open modal content detail
  openDetails(targetModal:any, us:User) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.initForm(us);
 }

 //open edit modal
 openEdit(targetModal:any, us:any) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.use=us;
  this.id = us.userId;
  this.initForm(us); 
}

//open delete modal
openDelete(targetModal:any, us:User){
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.use = us;
}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  initForm(us:User = {userNom:"",userLogin:"", userPassword:"123456",userRole:"",userStatut:0 }){
    this.userForm = this.fb.group({
      userNom:[us.userNom, [Validators.required]], 
      userLogin:[us.userLogin, [Validators.required]], 
      userPassword:[us.userPassword, Validators.required],
      userRole:[us.userRole, [Validators.required]], 
    })

  }


  public onSubmit(){
    if(this.use){
      this.userService.editUser(this.id,this.userForm.value).subscribe(()=>{
        this.ngOnInit();
      })
    }else{
      this.userService.addUser(this.userForm.value).subscribe(()=>{
        this.ngOnInit();
      }, () =>{
        this.mgs = "error";
        console.log(this.mgs);
        
      })
    }
    
  }

  public deleteUser(){
    this.userService.deleteUser(this.use).subscribe(()=>{
      this.ngOnInit(); //reload the table
      this.modalService.dismissAll();
    })
  }

}
