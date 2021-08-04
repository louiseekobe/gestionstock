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
public class LigneCmdFr {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer lcmdfrId;
	private Integer quantitecmd;
	private Integer numProd;
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cdfrId")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private CommandeFournisseur cmdFr;
	
	
	
	public Integer getLcmdfrId() {
		return lcmdfrId;
	}
	public CommandeFournisseur getCmdFr() {
		return cmdFr;
	}
	
	public void setLcmdfrId(Integer lcmdfrId) {
		this.lcmdfrId = lcmdfrId;
	}
	public void setCmdFr(CommandeFournisseur cmdFr) {
		this.cmdFr = cmdFr;
	}

	public Integer getQuantitecmd() {
		return quantitecmd;
	}
	public void setQuantitecmd(Integer quantitecmd) {
		this.quantitecmd = quantitecmd;
	}
	public Integer getNumProd() {
		return numProd;
	}
	public void setNumProd(Integer numProd) {
		this.numProd = numProd;
	}
	
	
	
	

}
