import { Fournisseur } from "./fournisseur.class";
import { LigneCommandeFr } from "./ligneCommandeFr.class";


export class CommandeFournisseur{
  cdfrId?:number;
  cdFrdate!:Date;
  montant!:number;
  listLigne!:LigneCommandeFr[];
  fr!:Fournisseur;
}
