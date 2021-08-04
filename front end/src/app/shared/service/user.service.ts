import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../class/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user!:User;
  constructor(private http:HttpClient) { }

  //connexion
  public loginUser(us:User):Observable<any>{
    return this.http.post("http://localhost:9999/utilisateur/connexion", us)
  }

  //afficher la liste de tous les utilisateurs
  public listUser():Observable<any>{
    return this.http.get('http://localhost:9999/utilisateur');
  }

  //ajouter un utilisateur
  public addUser(us:User):Observable<any>{
    return this.http.post("http://localhost:9999/utilisateur/enregistrer", us)
  }

  //editer un utilisateur
  public editUser(id:number, us:User):Observable<any>{
    return this.http.put(`http://localhost:9999/utilisateur/${id}/edit`, us);
  }

  //mettre a jour le mot de passe
  // /utilisateur/changepassword
  public resetPassword(us:User):Observable<any>{
    return this.http.put(`http://localhost:9999/utilisateur/changepassword`, us);
  }

  //delete un utilisateur
  public deleteUser(us:User):Observable<any>{
    return this.http.delete(`http://localhost:9999/utilisateur/${us['userId']}/supprimer`);
  }



}
