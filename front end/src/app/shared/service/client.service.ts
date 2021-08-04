import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../class/client.class';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  //afficher tous les clients
  public ListClient():Observable<any>{
    return this.http.get('http://localhost:9999/client');
  }
  //ajouter un client
  public addClient(cl:Client):Observable<any>{
    return this.http.post('http://localhost:9999/client/enregistrer',cl);
  }

  //update un client
  public updateClient(id:number, cl:Client):Observable<any>{
    return this.http.put(`http://localhost:9999/client/${id}/edit`,cl);
  }

  //delete un client
  public deleteClient(cl:Client):Observable<any>{
    return this.http.delete(`http://localhost:9999/client/${cl['clId']}/supprimer`)
  }



}
