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
public class Client {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer clId;
	private String clNom;
	private String clPrenom;
	private String clTel;
	private String clemail;
	
	@OneToMany(mappedBy="cl", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	private Set<CommandeClient> listCommande =  new HashSet<>();
	
	public Client() {
		
	}

	public Client(Integer clId, String clNom, String clPrenom, String clTel, String clemail) {
		
		this.clId = clId;
		this.clNom = clNom;
		this.clPrenom = clPrenom;
		this.clTel = clTel;
		this.clemail = clemail;
	}
	
	
	public Client(String clNom, String clPrenom, String clTel, String clemail) {
		
		this.clNom = clNom;
		this.clPrenom = clPrenom;
		this.clTel = clTel;
		this.clemail = clemail;
	}

	public Integer getClId() {
		return clId;
	}

	public String getClNom() {
		return clNom;
	}

	public String getClPrenom() {
		return clPrenom;
	}

	public String getClTel() {
		return clTel;
	}

	public String getClemail() {
		return clemail;
	}

	public void setClId(Integer clId) {
		this.clId = clId;
	}

	public void setClNom(String clNom) {
		this.clNom = clNom;
	}

	public void setClPrenom(String clPrenom) {
		this.clPrenom = clPrenom;
	}

	public void setClTel(String clTel) {
		this.clTel = clTel;
	}

	public void setClemail(String clemail) {
		this.clemail = clemail;
	}

	public Set<CommandeClient> getListLigne() {
		return listCommande;
	}
	


	public void setListLigne(Set<CommandeClient> listLigne) {
		this.listCommande = listLigne;
		for(CommandeClient lc:listLigne) {
			lc.setCl(this);
		}
	}

	
	
	
	

}
