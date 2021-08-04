import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categorie } from 'src/app/shared/class/categorie.class';
import { CategorieService } from 'src/app/shared/service/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  cats!:Categorie[];
  closeResult!:string;
  cat!:Categorie;
  catForm!:FormGroup;
  mgs!:string;
  id!:number
  constructor(private catService:CategorieService,private modalService: NgbModal, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.catService.listCategorie().subscribe(data=>{
      this.cats = data;
    })
    this.initForm();
  }

  initForm(cat1:Categorie={catNom:""}){
    this.catForm = this.fb.group({
      catNom:[cat1.catNom, Validators.required],
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
  openDetails(targetModal:any, cat1:Categorie) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.initForm(cat1);
 }

 //open edit modal
 openEdit(targetModal:any, cate:any) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.cat=cate;
  this.id = cate.catId;
  this.initForm(cate); 
}

//open delete modal
openDelete(targetModal:any, cate:Categorie){
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.cat = cate;
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
    if(this.cat){
      this.catService.updateCategorie(this.id,this.catForm.value).subscribe(()=>{
        this.ngOnInit();
        this.cat!;
      })
    }else{
      this.catService.addCategorie(this.catForm.value).subscribe(()=>{
        this.ngOnInit();
      }, ()=>{
        this.mgs = "error";
        console.log(this.mgs);
      })
    }
    
  }

  public deleteCategorie(){
    this.catService.deleteCategorie(this.cat).subscribe(()=>{
      this.ngOnInit(); //reload the table
      this.modalService.dismissAll();
    })
  }


}
