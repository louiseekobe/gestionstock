import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandeFournisseur } from '../class/commandeFournisseur.class';

@Injectable({
  providedIn: 'root'
})
export class CommandeFournisseurService {

  constructor(private http:HttpClient) { }

  //afficher tous les commande fournisseurs
  public ListCommandeFournisseur():Observable<any>{
    return this.http.get('http://localhost:9999/commande/fournisseur');
  }
  //ajouter une commande
  public addCommandeFournisseur(cmd:CommandeFournisseur):Observable<any>{
    return this.http.post('http://localhost:9999/commande/fournisseur/enregistrer',cmd);
  }

  //update une commande
  public updateCommandeFournisseur(id:number, cmd:CommandeFournisseur):Observable<any>{
    return this.http.put(`http://localhost:9999/commande/fournisseur/${id}/edit`,cmd);
  }

  //delete une commande
  public deleteCommandeFournisseur(cmd:CommandeFournisseur):Observable<any>{
    return this.http.delete(`http://localhost:9999/commande/fournisseur/${cmd['cdfrId']}/supprimer`)
  }


}
