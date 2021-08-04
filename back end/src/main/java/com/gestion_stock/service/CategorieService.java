package com.gestion_stock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion_stock.model.Categorie;
import com.gestion_stock.repository.CategorieRepository;

@Service
public class CategorieService {
	
	@Autowired
	CategorieRepository repo;
	
	
	//afficher la liste des categories
	public List<Categorie> getCategorie(){
		return repo.findAll();
	}
	
	
	
	//ajouter une categorie
	public Categorie saveCategorie(Categorie cat) {
		return repo.save(cat);
	}
	
	
	//rechercher une categorie en fonction de son nom
	public Categorie fetchCategorieByName(String nom) {
		return repo.findByCatNom(nom);
	}
		
	//mettre a jour une categorie
	public Categorie updateCategorie(Integer id, Categorie cat) {
		cat.setCatId(id);
		return repo.save(cat);
	}
		
		
	//supprimer une categorie
	public void deleteCategorie(Integer id) {
		repo.deleteById(id);
	}
		
		
		
		
		


}
