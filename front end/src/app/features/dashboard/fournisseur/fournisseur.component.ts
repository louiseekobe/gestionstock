import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fournisseur } from 'src/app/shared/class/fournisseur.class';
import { FournisseurService } from 'src/app/shared/service/fournisseur.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit {
  frs!:Fournisseur[];
  closeResult!:string;
  fr!:Fournisseur;
  frForm!:FormGroup;
  mgs!:string;
  id!:number
  constructor(private fournisseurService:FournisseurService, private modalService: NgbModal, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.fournisseurService.listFournisseur().subscribe(result=>{
      this.frs = result;
    });
    this.initForm();
  }

  initForm(f1:Fournisseur={frNom:"", frPrenom:"",frTel:"",email:""}){
    this.frForm = this.fb.group({
      frNom:[f1.frNom, Validators.required],
      frPrenom:[f1.frPrenom, Validators.required],
      frTel:[f1.frTel, Validators.required],
      email:[f1.email, [Validators.email, Validators.required]]
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
  openDetails(targetModal:any, f1:Fournisseur) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.initForm(f1);
 }

 //open edit modal
 openEdit(targetModal:any, f:any) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.fr=f;
  this.id = f.frId;
  this.initForm(f); 
}

//open delete modal
openDelete(targetModal:any, f:Fournisseur){
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.fr = f;
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
    if(this.fr){
      this.fournisseurService.updateFournisseur(this.id,this.frForm.value).subscribe(()=>{
        this.ngOnInit();
      })
    }else{
      this.fournisseurService.addFournisseur(this.frForm.value).subscribe(()=>{
        this.ngOnInit();
      }, ()=>{
        this.mgs = "error";
        console.log(this.mgs);
      })
    }
    
  }

  public deleteFournisseur(){
    this.fournisseurService.deleteFournisseur(this.fr).subscribe(()=>{
      this.ngOnInit(); //reload the table
      this.modalService.dismissAll();
    })
  }


}
