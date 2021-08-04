import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from '../class/fournisseur.class';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  constructor(private http:HttpClient) { }

  //afficher la liste des fournisseurs
  public listFournisseur():Observable<any>{
    return this.http.get('http://localhost:9999/fournisseur');
  }


  //ajouter un fournisseur
  public addFournisseur(fr:Fournisseur):Observable<any>{
    return this.http.post('http://localhost:9999/fournisseur/enregistrer', fr)
  }

  //mettre à jour les information sur un fournisseur
  public updateFournisseur(id:number, fr:Fournisseur):Observable<any>{
    return this.http.put(`http://localhost:9999/fournisseur/${id}/edit`,fr);
  }

  //supprimer un fournisseur
  public deleteFournisseur(fr:Fournisseur):Observable<any>{
    return this.http.delete(`http://localhost:9999/fournisseur/${fr['frId']}/supprimer`)
  }
}
