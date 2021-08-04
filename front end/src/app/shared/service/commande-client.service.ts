import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandeClient } from '../class/commandeClient.class';

@Injectable({
  providedIn: 'root'
})
export class CommandeClientService {

  constructor(private http:HttpClient) { }


   //afficher tous les clients
   public ListCommandeClient():Observable<any>{
    return this.http.get('http://localhost:9999/commande/client');
  }
  //ajouter un client
  public addCommandeClient(cmd:CommandeClient):Observable<any>{
    return this.http.post('http://localhost:9999/commande/client/enregistrer',cmd);
  }

  //update un client
  public updateCommandeClient(id:number, cmd:CommandeClient):Observable<any>{
    return this.http.put(`http://localhost:9999/commande/client/${id}/edit`,cmd);
  }

  //delete un client
  public deleteCommandeClient(cmd:CommandeClient):Observable<any>{
    return this.http.delete(`http://localhost:9999/commande/client/${cmd['cdId']}/supprimer`)
  }


}
