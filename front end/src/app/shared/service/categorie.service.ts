import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../class/categorie.class';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http:HttpClient) { }

  //afficher toutes les cathegorie
  public listCategorie():Observable<any>{
    return this.http.get('http://localhost:9999/categorie');
  }

  //ajouter une categorie
  public addCategorie(cat:Categorie):Observable<any>{
    return this.http.post('http://localhost:9999/categorie/enregistrer', cat);
  }

  //update une categorie
  public updateCategorie(id:number, cat:Categorie):Observable<any>{
    return this.http.put(`http://localhost:9999/categorie/${id}/edit`,cat);
  }

  //supprimer une categorie
  public deleteCategorie(cat:Categorie):Observable<any>{
    return this.http.delete(`http://localhost:9999/categorie/${cat['catId']}/supprimer`)
  }


}
