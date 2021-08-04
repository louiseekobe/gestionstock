import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandeFournisseur } from 'src/app/shared/class/commandeFournisseur.class';
import { Fournisseur } from 'src/app/shared/class/fournisseur.class';
import { Produit } from 'src/app/shared/class/produit.class';
import { CommandeFournisseurService } from 'src/app/shared/service/commande-fournisseur.service';
import { FournisseurService } from 'src/app/shared/service/fournisseur.service';
import { ProduitService } from 'src/app/shared/service/produit.service';

@Component({
  selector: 'app-commande-fournisseur',
  templateUrl: './commande-fournisseur.component.html',
  styleUrls: ['./commande-fournisseur.component.scss']
})
export class CommandeFournisseurComponent implements OnInit {

  cmds!:CommandeFournisseur[];
  frs!:Fournisseur[];
  fr!:Fournisseur;
  prods!:Produit[];
  prod!:Produit;
  closeResult!:string;
  cmd!:CommandeFournisseur;
  cmdForm!:FormGroup;
  mgs!:string;
  id!:number
  constructor(private commandeFournisseurService:CommandeFournisseurService, private produitService:ProduitService, private fournisseurService:FournisseurService,private modalService: NgbModal, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.commandeFournisseurService.ListCommandeFournisseur().subscribe(data =>{
      this.cmds = data;
      console.log(this.cmds);
      
    });
    this.produitService.listProduit().subscribe(data=>{
      this.prods = data;
    });
    this.fournisseurService.listFournisseur().subscribe(data=>{
      this.frs = data;
    })

    this.initForm();

  }

  /*
  cdfrId?:number;
  cdFrdate!:Date;
  montant!:number;
  listLigne!:LigneCommandeFr[];
  fr!:Fournisseur;

   lcmdfrId?:number;
  quantitecmd!:number;
  numProd!:number;
  */
  initForm(cmd1:CommandeFournisseur={cdFrdate: new Date(), montant: 0, listLigne: [], fr: new Fournisseur()}){
    this.cmdForm = this.fb.group({
      cdFrdate:[cmd1.cdFrdate, Validators.required],
      listLigne:this.fb.array(
        cmd1.listLigne.map(LigneCommandeCl =>
          this.fb.group({
            quantitecmd: [LigneCommandeCl.quantitecmd, Validators.required],
            numProd: [LigneCommandeCl.numProd, Validators.required]
          })
        ),
        Validators.required
      ),
      fr:[cmd1.fr, Validators.required],
    });
  }


  public get listLigne(){
    return this.cmdForm.get('listLigne') as FormArray;
  }


  public addLigne():void{
    this.listLigne.push(this.fb.group({
      quantitecmd:[0, Validators.required],
      numProd:[0, Validators.required]
    })
    );
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
  openDetails(targetModal:any, cmd1:CommandeFournisseur) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.initForm(cmd1);
 }

 //open edit modal
 openEdit(targetModal:any, cate:any) {
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.cmd=cate;
  this.id = cate.cdfrId;
  this.initForm(cate); 
}

//open delete modal
openDelete(targetModal:any, cate:CommandeFournisseur){
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
  this.cmd = cate;
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
    if(this.cmd){
      this.commandeFournisseurService.updateCommandeFournisseur(this.id,this.cmdForm.value).subscribe(()=>{
        console.log(this.cmdForm.value);
        this.ngOnInit();
      })
    }else{
      this.commandeFournisseurService.addCommandeFournisseur(this.cmdForm.value).subscribe(()=>{
        this.ngOnInit();
        console.log(this.cmdForm.value);
        
      }, ()=>{
        this.mgs = "error";
        console.log(this.cmdForm.value);
        console.log(this.mgs);
      })
    }
    
  }

  public deleteCommande(){
    this.commandeFournisseurService.deleteCommandeFournisseur(this.cmd).subscribe(()=>{
      this.ngOnInit(); //reload the table
      this.modalService.dismissAll();
    })
  }





}
