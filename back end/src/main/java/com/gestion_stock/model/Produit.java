package com.gestion_stock.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
public class Produit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer prodId;
	private String prodNom;
	private int quantite;
	private double prixachat;
	private double prixvente;
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "frId")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Fournisseur fr;
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "catId")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Categorie cat;


	public Integer getProdId() {
		return prodId;
	}


	public String getProdNom() {
		return prodNom;
	}


	public int getQuantite() {
		return quantite;
	}


	public double getPrixachat() {
		return prixachat;
	}


	public double getPrixvente() {
		return prixvente;
	}



	public void setProdId(Integer prodId) {
		this.prodId = prodId;
	}


	public void setProdNom(String prodNom) {
		this.prodNom = prodNom;
	}


	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}


	public void setPrixachat(double prixachat) {
		this.prixachat = prixachat;
	}


	public void setPrixvente(double prixvente) {
		this.prixvente = prixvente;
	}


	public Fournisseur getFr() {
		return fr;
	}


	public Categorie getCat() {
		return cat;
	}


	public void setFr(Fournisseur fr) {
		this.fr = fr;
	}


	public void setCat(Categorie cat) {
		this.cat = cat;
	}


	
	

	
	
	
	
	

}
