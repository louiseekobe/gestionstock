import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categorie } from 'src/app/shared/class/categorie.class';
import { Fournisseur } from 'src/app/shared/class/fournisseur.class';
import { Produit } from 'src/app/shared/class/produit.class';
import { CategorieService } from 'src/app/shared/service/categorie.service';
import { FournisseurService } from 'src/app/shared/service/fournisseur.service';
import { ProduitService } from 'src/app/shared/service/produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  prods!:Produit[];
  cats!:Categorie[];
  cate!:Categorie;
  frs!:Fournisseur[];
  fr1!:Fournisseur;
  closeResult!:string;
  prod!:Produit;
  prodForm!:FormGroup;
  mgs!:string;
  id!:number
  constructor(private prodService:ProduitService,private modalService: NgbModal, private fb:FormBuilder, private catService:CategorieService, private frService:FournisseurService) { }

  ngOnInit(): void {
    this.prodService.listProduit().subscribe(data=>{
      console.log(data);
      this.prods = data;
    })
    this.catService.listCategorie().subscribe(data=>{
      this.cats = data;
    })
    this.frService.listFournisseur().subscribe(data=>{
      this.frs = data;
    })
    this.initForm();
  }

  /*
  prodId?:number;
  prodNom!: string;
  quantite!:number;
  prixachat!:number;
  prixvente!:number;
  fr!:Fournisseur;
  cat!:Categorie; */

  initForm(prod1:Produit={prodNom:"",quantite:0, prixachat:0, prixvente:0, fr: new Fournisseur(), cat: new Categorie()}){
    this.prodForm = this.fb.group({
      prodNom:[prod1.prodNom, Validators.required],
      quantite:[prod1.quantite, Validators.required],
      prixachat:[prod1.prixachat, Validators.required],
      prixvente:[prod1.prixvente, Validators.required],
      fr:[prod1.fr, Validators.required],
      cat:[prod1.cat, Validators.required]
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
  openDetails(targetModal:any, prod1:Produit) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.initForm(prod1);
 }

 //open edit modal
 openEdit(targetModal:any, cate:any) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.prod=cate;
  this.id = cate.prodId;
  this.initForm(cate); 
}

//open delete modal
openDelete(targetModal:any, cate:Produit){
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.prod = cate;
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
    if(this.prod){
      this.prodService.updateProduit(this.id,this.prodForm.value).subscribe(()=>{
        this.ngOnInit();
      })
    }else{
      this.prodService.addProduit(this.prodForm.value).subscribe(()=>{
        this.ngOnInit();
        console.log(this.prodForm.value);
        
      }, ()=>{
        this.mgs = "error";
        console.log(this.prodForm.value);
        console.log(this.mgs);
      })
    }
    
  }

  public deleteCategorie(){
    this.prodService.deleteProduit(this.prod).subscribe(()=>{
      this.ngOnInit(); //reload the table
      this.modalService.dismissAll();
    })
  }


}
