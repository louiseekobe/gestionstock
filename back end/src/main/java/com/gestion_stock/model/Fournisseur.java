package com.gestion_stock.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Fournisseur {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer frId;
	private String frNom;
	private String frPrenom;
	private String frTel;
	private String email;
	@OneToMany(mappedBy="fr", cascade=CascadeType.ALL)
	private Set<Produit> listProduit = new HashSet<>();
	@OneToMany(mappedBy="fr",fetch=FetchType.LAZY)
	private Set<CommandeFournisseur>listCommandeFr = new HashSet<>();
	
	
	public Fournisseur() {
		
	}
	
	public Fournisseur(String frNom, String frPrenom, String frTel, String email) {
		
		this.frNom = frNom;
		this.frPrenom = frPrenom;
		this.frTel = frTel;
		this.email = email;
	}


	public Fournisseur(Integer frId, String frNom, String frPrenom, String frTel, String email) {
	
		this.frId = frId;
		this.frNom = frNom;
		this.frPrenom = frPrenom;
		this.frTel = frTel;
		this.email = email;
	}
	
	

	public Integer getFrId() {
		return frId;
	}

	public String getFrNom() {
		return frNom;
	}

	public String getFrPrenom() {
		return frPrenom;
	}

	public String getFrTel() {
		return frTel;
	}

	public String getEmail() {
		return email;
	}

	public void setFrId(Integer frId) {
		this.frId = frId;
	}

	public void setFrNom(String frNom) {
		this.frNom = frNom;
	}

	public void setFrPrenom(String frPrenom) {
		this.frPrenom = frPrenom;
	}

	public void setFrTel(String frTel) {
		this.frTel = frTel;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<Produit> getListProduit() {
		return listProduit;
	}

	public void setListProduit(Set<Produit> listProduit) {
		this.listProduit = listProduit;
			for(Produit p: listProduit) {
			
			p.setFr(this);
		}
	}

	public Set<CommandeFournisseur> getListCommandeFr() {
		return listCommandeFr;
	}

	public void setListCommandeFr(Set<CommandeFournisseur> listCommandeFr) {
		this.listCommandeFr = listCommandeFr;
		for(CommandeFournisseur cdFr: listCommandeFr) {
			cdFr.setFr(this);
		}
		
	}

	
	
	
	
	

}
