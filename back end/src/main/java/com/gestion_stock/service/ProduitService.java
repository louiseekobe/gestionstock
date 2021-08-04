package com.gestion_stock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion_stock.model.Produit;
import com.gestion_stock.repository.ProduitRepository;

@Service
public class ProduitService {
	
	@Autowired
	ProduitRepository repo;
	
	
	//afficher la liste des produits
	public List<Produit>getProduit(){
		return repo.findAll();
	}
	
	
	//ajouter un produit
	public Produit addProduit(Produit p ) {
		return repo.save(p);
	}
	
	
	//mettre à jour un produit
	public Produit addProduit(Integer id, Produit p) {
		p.setProdId(id);
		return repo.save(p);
	}
	
	
	//supprimer un produit
	public void deleteProduit(Integer id) {
		repo.deleteById(id);
	}
	
	
	//mettre a jour la quatite d'un produit
	
	
	
	
	
	
	
	
	
}
