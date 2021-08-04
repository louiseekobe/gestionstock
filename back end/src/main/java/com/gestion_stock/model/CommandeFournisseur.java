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
public class CommandeFournisseur {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer cdfrId;
	private Date cdFrdate;
	private Double montant;
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "frId")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Fournisseur fr;
	@OneToMany(mappedBy="cmdFr", cascade=CascadeType.ALL)
	private Set<LigneCmdFr> listLigne = new HashSet<>();
	
	
	public Integer getCdfrId() {
		return cdfrId;
	}



	public Date getCdFrdate() {
		return cdFrdate;
	}



	public Fournisseur getFr() {
		return fr;
	}



	public void setCdfrId(Integer cdfrId) {
		this.cdfrId = cdfrId;
	}



	public void setCdFrdate(Date cdFrdate) {
		this.cdFrdate = cdFrdate;
	}




	public void setFr(Fournisseur fr) {
		this.fr = fr;
	}



	public Set<LigneCmdFr> getListLigne() {
		return listLigne;
	}
	


	public void setListLigne(Set<LigneCmdFr> listLigne) {
		this.listLigne = listLigne;
		for(LigneCmdFr lc:listLigne) {
			lc.setCmdFr(this);
		}
	}



	public Double getMontant() {
		return montant;
	}



	public void setMontant(Double montant) {
		this.montant = montant;
	}

	
	
	
}
