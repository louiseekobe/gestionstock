import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/shared/class/produit.class';
import { ClientService } from 'src/app/shared/service/client.service';
import { ProduitService } from 'src/app/shared/service/produit.service';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {
  result!:any;
  prod:Produit[] = [];
  nom = '';
  constructor(private clService : ClientService, private prodService:ProduitService) { }

  ngOnInit(): void {
    this.clService.ListClient().subscribe(data =>{
      this.result = data;
      console.log(this.result);
      
    })
    this.prodService.listProduit().subscribe(data =>{
      this.prod = data;
      console.log(this.prod);
      
    })
  }

  public nomProduit(code:number):string{
    this.prod.forEach(el =>{
      if(el.prodId == code){
        this.nom = el.prodNom;
      }
    })
    return this.nom;
  }

}
