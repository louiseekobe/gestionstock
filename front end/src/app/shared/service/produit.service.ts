import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../class/produit.class';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http:HttpClient) { }


  //afficher la liste de tous les produits
  public listProduit():Observable<any>{
    return this.http.get('http://localhost:9999/produit');
  }
  
   //ajouter une categorie
   public addProduit(prod:Produit):Observable<any>{
    return this.http.post('http://localhost:9999/produit/enregistrer', prod);
  }

  //update une categorie
  public updateProduit(id:number, prod:Produit):Observable<any>{
    return this.http.put(`http://localhost:9999/categorie/${id}/edit`,prod);
  }

  //supprimer une categorie
  public deleteProduit(prod:Produit):Observable<any>{
    return this.http.delete(`http://localhost:9999/categorie/${prod['prodId']}/supprimer`)
  }
}
