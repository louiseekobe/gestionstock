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
public class LigneCmdClient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer lcmdClId;
	private Integer quantitecmd;
	private Integer numProd;
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cdId")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private CommandeClient cmdClient;
	
	public Integer getLcmdClId() {
		return lcmdClId;
	}
	
	public Integer getQuantitecmd() {
		return quantitecmd;
	}
	
	public Integer getNumProd() {
		return numProd;
	}
	
	public CommandeClient getCmdClient() {
		return cmdClient;
	}
	
	public void setLcmdClId(Integer lcmdClId) {
		this.lcmdClId = lcmdClId;
	}
	
	public void setQuantitecmd(Integer quantitecmd) {
		this.quantitecmd = quantitecmd;
	}
	
	public void setNumProd(Integer numProd) {
		this.numProd = numProd;
	}
	
	public void setCmdClient(CommandeClient cmdClient) {
		this.cmdClient = cmdClient;
	}
	
	
	

}
