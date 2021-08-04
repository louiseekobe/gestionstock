package com.gestion_stock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.gestion_stock.model.Fournisseur;
import com.gestion_stock.repository.FournisseurRepository;

@Service
public class FournisseurService implements WebMvcConfigurer{
	
	@Autowired
	FournisseurRepository repo;
	
	
	//afficher la liste des fournisseurs
	public List<Fournisseur> getFournisseur(){
		return repo.findAll();
	}
	
	//rechercher un fournisseur par son email
	public Fournisseur fetchFournisseurByTel(String tel) {
		return repo.findByFrTel(tel);
	}
	
	
	//rechercher un fournissuer par son telephone
	public Fournisseur fetchFournisseurByEmail(String Email) {
		return repo.findByEmail(Email);
	}
	
	
	//ajouter un fournisseur
	public Fournisseur saveFournisseur(Fournisseur fr) {
		return repo.save(fr);
	}
	
	
	//mettre à jour un fournisseur
	public Fournisseur updateFournisseur(Integer id,Fournisseur fr) {
		fr.setFrId(id);
		return repo.save(fr);
	}
	
	
	//supprimer un fournisseur
	public void deleteFournisseur(Integer id) {
		repo.deleteById(id);
	}
	
	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("*");
    }
	

}
