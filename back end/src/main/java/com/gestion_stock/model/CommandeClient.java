package com.gestion_stock.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class CommandeClient {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer cdId;
	private Date cdDate;
	private Double montant;
	private int statu;
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name="clId")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Client cl;
	@OneToMany(mappedBy="cmdClient", cascade=CascadeType.ALL)
	private Set<LigneCmdClient> listLigne = new HashSet<>();
	
	
	public Integer getCdId() {
		return cdId;
	}

	public Date getCdDate() {
		return cdDate;
	}

	

	public int getStatu() {
		return statu;
	}

	public Client getCl() {
		return cl;
	}

	public void setCdId(Integer cdId) {
		this.cdId = cdId;
	}

	public void setCdDate(Date cdDate) {
		this.cdDate = cdDate;
	}


	public void setStatu(int statu) {
		this.statu = statu;
	}

	public void setCl(Client cl) {
		this.cl = cl;
	}


	public Set<LigneCmdClient> getListLigne() {
		return listLigne;
	}
	


	public void setListLigne(Set<LigneCmdClient> listLigne) {
		this.listLigne = listLigne;
		for(LigneCmdClient lc:listLigne) {
			lc.setCmdClient(this);
		}
	}



	public Double getMontant() {
		return montant;
	}



	public void setMontant(Double montant) {
		this.montant = montant;
	}

	
	
	
	
	
	
	
	

}
