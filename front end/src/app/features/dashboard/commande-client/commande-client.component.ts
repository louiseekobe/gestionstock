import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/shared/class/client.class';
import { CommandeClient } from 'src/app/shared/class/commandeClient.class';
import { LigneCommandeCl } from 'src/app/shared/class/ligneCommandeCl.class';
import { Produit } from 'src/app/shared/class/produit.class';
import { ClientService } from 'src/app/shared/service/client.service';
import { CommandeClientService } from 'src/app/shared/service/commande-client.service';
import { ProduitService } from 'src/app/shared/service/produit.service';

@Component({
  selector: 'app-commande-client',
  templateUrl: './commande-client.component.html',
  styleUrls: ['./commande-client.component.scss']
})
export class CommandeClientComponent implements OnInit {

  cmds!:CommandeClient[];
  cls!:Client[];
  cl!:Client;
  prods!:Produit[];
  prod!:Produit;
  closeResult!:string;
  cmd!:CommandeClient;
  cmdForm!:FormGroup;
  mgs!:string;
  id!:number
  data:Client[] = [];

  constructor(private commandeClientService:CommandeClientService, private produitService:ProduitService, private clientService:ClientService,private modalService: NgbModal, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.commandeClientService.ListCommandeClient().subscribe(data =>{
      this.cmds = data;
      console.log(this.cmds);
      
    });
    this.produitService.listProduit().subscribe(data=>{
      this.prods = data;
    });
    this.clientService.ListClient().subscribe(data=>{
      this.cls = data;
      console.log(data);
      
    })
    this.cmd!;
    this.initForm();

  }

  /*
  cdId?:number;
  cdDate!:Date;
  montant!:number;
  listLigne!:LigneCommandeCl[];
  cl!:Client;
  */ 

  initForm(cmd1:CommandeClient={cdDate: new Date(), montant: 0, listLigne: [], cl: new Client()}){
    this.cmdForm = this.fb.group({
      cdDate:[cmd1.cdDate, Validators.required],
      listLigne:this.fb.array(
        cmd1.listLigne.map(LigneCommandeCl =>
          this.fb.group({
            quantitecmd: [LigneCommandeCl.quantitecmd, Validators.required],
            numProd: [LigneCommandeCl.numProd, Validators.required]
          })
        ),
        Validators.required
      ),
      cl:[cmd1.cl, Validators.required],
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
  openDetails(targetModal:any, cmd1:CommandeClient) {
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
  this.id = cate.cdId;
  this.initForm(cate); 
}

//open delete modal
openDelete(targetModal:any, cate:CommandeClient){
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
      this.commandeClientService.updateCommandeClient(this.id,this.cmdForm.value).subscribe(()=>{
        console.log("valeur : ",this.cmdForm.value);
        this.ngOnInit();
        
      })
    }else{
      this.commandeClientService.addCommandeClient(this.cmdForm.value).subscribe(()=>{
        this.ngOnInit();
        console.log(this.cmdForm.value);
        this.data.push(this.cmdForm.value);
        console.log(this.data);
        
        
      }, ()=>{
        this.mgs = "error";
        console.log(this.cmdForm.value);
        console.log(this.mgs);
      })
    }
    
  }

  public deleteCommande(){
    this.commandeClientService.deleteCommandeClient(this.cmd).subscribe(()=>{
      this.ngOnInit(); //reload the table
      this.modalService.dismissAll();
    })
  }



}
