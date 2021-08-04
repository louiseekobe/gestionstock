package com.gestion_stock.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gestion_stock.model.Fournisseur;
import com.gestion_stock.service.FournisseurService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FournisseurController  implements ErrorController{
	
	@Autowired
	FournisseurService service;
	
	
	
	//afficher la liste des fournisseur
	@GetMapping("/fournisseur")
	public List<Fournisseur> afficherFournisseur(){
		return service.getFournisseur();
	}
	
	
	//mettre à jour les informations sur un fournisseur
	@PutMapping("/fournisseur/{id}/edit")
	public Fournisseur updateFournisseur(@PathVariable("id") Integer id, @RequestBody Fournisseur fr) {
		return service.updateFournisseur(id, fr);
	}
	
	
	//ajouter un fournisseur
	@PostMapping("/fournisseur/enregistrer")
	public Fournisseur ajouterFournisseur(@RequestBody Fournisseur fr) throws Exception {
		String tempTel = fr.getFrTel();
		String tempEmail = fr.getEmail();
		
		if(!tempTel.isEmpty() && !tempEmail.isEmpty()) {
			Fournisseur f1 = service.fetchFournisseurByTel(tempTel);
			Fournisseur f2 = service.fetchFournisseurByEmail(tempEmail);
			if(f1 != null) {
				throw new Exception("un fournisseur avec le numéro: "+tempTel+" existe");
			}
			if(f2 != null) {
				throw new Exception("un fournisseur avec le numéro: "+tempTel+" existe");
			}
		}
		Fournisseur frObj = service.saveFournisseur(fr);
		return frObj;
	}
	
	
	
	//supprimer un fournisseur
	@DeleteMapping("/fournisseur/{id}/supprimer")
	public void deleteFournisseur(@PathVariable("id") Integer id) {
		service.deleteFournisseur(id);
	}
	
	
	
	

}
