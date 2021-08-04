package com.gestion_stock.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Categorie {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer catId;
	private String catNom;
	
	//  private Set<Book> books = new HashSet<>();
	@OneToMany(mappedBy="cat",cascade=CascadeType.ALL)
	private Set<Produit> listProduit = new HashSet<>();
	
	public Categorie() {
		
	}

	
	
	
	public Categorie(Integer catId, String catNom) {
		super();
		this.catId = catId;
		this.catNom = catNom;
	}
	
	
	public Categorie( String catNom) {
		
		this.catNom = catNom;
	}



	public Integer getCatId() {
		return catId;
	}



	public String getCatNom() {
		return catNom;
	}



	public void setCatId(Integer catId) {
		this.catId = catId;
	}



	public void setCatNom(String catNom) {
		this.catNom = catNom;
	}



	public Set<Produit> getListProduit() {
		return listProduit;
	}



	public void setListProduit(Set<Produit> listProduit) {
		this.listProduit = listProduit;
		
		for(Produit p: listProduit) {
			
			p.setCat(this);
		}
	}
	
	
	
	
	
	
	

}
