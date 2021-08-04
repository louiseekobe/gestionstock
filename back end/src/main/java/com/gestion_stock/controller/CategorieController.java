package com.gestion_stock.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gestion_stock.model.Categorie;
import com.gestion_stock.service.CategorieService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CategorieController {
	
	@Autowired
	CategorieService service;
	
	
	//afficher la liste des categories
	@GetMapping("/categorie")
	public List<Categorie>getCategorie(){
		return service.getCategorie();
	}
	
	//ajouter une categorie
	 @PostMapping("/categorie/enregistrer")
	 public Categorie registerCategorie(@RequestBody Categorie cat) throws Exception{
		 String nom = cat.getCatNom();
		 if(nom != null && !nom.equals("")) {
			 Categorie c = service.fetchCategorieByName(nom);
			 if(c != null) {
				 throw new Exception("ce nom existe déjà");
			 }
		 }
		 Categorie catObj = null;
		 catObj = service.saveCategorie(cat);
		 return catObj;
	 }
	
	
	//mettre a jour une categorie
	 @PutMapping("/categorie/{id}/edit")
	 public Categorie updateCategorie(@PathVariable("id") Integer id, @RequestBody Categorie cat) {
		 return service.updateCategorie(id, cat);
	 }
	
	
	//supprimer une categorie
	//supprimer un client
	@DeleteMapping("/categorie/{id}/supprimer")
	public void deleteCategorie(@PathVariable("id") Integer id) {
		service.deleteCategorie(id);
	}
	
	
	
	
	

}
