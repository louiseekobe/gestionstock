import { Categorie } from "./categorie.class";
import { Fournisseur } from "./fournisseur.class";

export class Produit{
  prodId?:number;
  prodNom!: string;
  quantite!:number;
  prixachat!:number;
  prixvente!:number;
  fr!:Fournisseur;
  cat!:Categorie;
}


/*
private Integer prodId;
	private String prodNom;
	private int quantite;
	private double prixachat;
	private double prixvente;
  private Fournisseur fr;
  private Categorie cat;*/ 