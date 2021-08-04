import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/shared/class/client.class';
import { ClientService } from 'src/app/shared/service/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  cls!:Client[];
  closeResult!:string;
  cl!:Client;
  clForm!:FormGroup;
  mgs!:string;
  id!:number

  constructor(private clientService:ClientService, private modalService: NgbModal, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.clientService.ListClient().subscribe(data=>{
      this.cls = data;
      console.log(data);
      
    })
    this.initForm();
  }

  initForm(cl1:Client={clNom:"", clPrenom:"",clTel:"",clemail:""}){
    this.clForm = this.fb.group({
      clNom:[cl1.clNom, Validators.required],
      clPrenom:[cl1.clPrenom, Validators.required],
      clTel:[cl1.clTel, Validators.required],
      clemail:[cl1.clemail, [Validators.email, Validators.required]]
    });
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
  openDetails(targetModal:any, cl1:Client) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.initForm(cl1);
 }

 //open edit modal
 openEdit(targetModal:any, c:any) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.cl=c;
  this.id = c.clId;
  this.initForm(c); 
}

//open delete modal
openDelete(targetModal:any, c:Client){
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.cl = c;
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


  public onSubmit(){
    if(this.cl){
      this.clientService.updateClient(this.id,this.clForm.value).subscribe(()=>{
        this.ngOnInit();
      })
    }else{
      this.clientService.addClient(this.clForm.value).subscribe(
        ()=>{this.ngOnInit(); },
        ()=>{this.mgs = "error";
              console.log(this.mgs);}
      );
    }
    
  }

  public deleteClient(){
    this.clientService.deleteClient(this.cl).subscribe(()=>{
      this.ngOnInit(); //reload the table
      this.modalService.dismissAll();
    })
  }




}
