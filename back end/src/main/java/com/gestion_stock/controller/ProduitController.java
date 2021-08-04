package com.gestion_stock.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gestion_stock.model.Categorie;
import com.gestion_stock.model.Fournisseur;
import com.gestion_stock.model.Produit;
import com.gestion_stock.repository.CategorieRepository;
import com.gestion_stock.repository.FournisseurRepository;
import com.gestion_stock.repository.ProduitRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProduitController {
	
	ProduitRepository repoProd;
	CategorieRepository repoCat;
	FournisseurRepository repofr;
	
	@Autowired
	public ProduitController(ProduitRepository repoProd, CategorieRepository repoCat, FournisseurRepository repofr) {
		this.repoProd = repoProd;
		this.repoCat = repoCat;
		this.repofr = repofr;
	}
	
	
	//afficher la liste des produits
	@GetMapping("/produit")
	public List<Produit>getCategorie(){
		return repoProd.findAll();
	}
	/*public ResponseEntity<Page<Produit>> getAll(Pageable pageable) {
        return ResponseEntity.ok(repoProd.findAll(pageable));
    }*/


	//ajouter un produit
	 @PostMapping("/produit/enregistrer")
	 public ResponseEntity<Produit> create(@RequestBody @Valid Produit p) {
	        Optional<Categorie> optionalCategorie = repoCat.findById(p.getCat().getCatId());
	        Optional<Fournisseur> optionalFournisseur = repofr.findById(p.getFr().getFrId());
	        if (!optionalCategorie.isPresent() && !optionalFournisseur.isPresent()) {
	            return ResponseEntity.unprocessableEntity().build();
	        }

	        p.setCat(optionalCategorie.get());
	        p.setFr(optionalFournisseur.get());

	       Produit savedp = repoProd.save(p);
	        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
	            .buildAndExpand(savedp.getProdId()).toUri();

	        return ResponseEntity.created(location).body(savedp);
	    }
	
	//supprimer un produit
	 @DeleteMapping("/produit/{id}/supprimer")
	 public ResponseEntity<Produit> delete(@PathVariable Integer id) {
		 Optional<Produit> optionalProduit = repoProd.findById(id);
		 if (!optionalProduit.isPresent()) {
	            return ResponseEntity.unprocessableEntity().build();
	        }

	       repoProd.delete(optionalProduit.get());

	        return ResponseEntity.noContent().build();
	    }
	
	 
	 
	//mettre à jour un produit
	 @PutMapping("/produit/{id}/edit")
	 public ResponseEntity<Produit> update(@RequestBody @Valid Produit p, @PathVariable Integer id) {
		 Optional<Categorie> optionalCategorie = repoCat.findById(p.getCat().getCatId());
	      Optional<Fournisseur> optionalFournisseur = repofr.findById(p.getFr().getFrId());
	      if (!optionalCategorie.isPresent() && !optionalFournisseur.isPresent()) {
	            return ResponseEntity.unprocessableEntity().build();
	        }

	        Optional<Produit> optionalProduit = repoProd.findById(id);
	        if (!optionalProduit.isPresent()) {
	            return ResponseEntity.unprocessableEntity().build();
	        }

	        p.setCat(optionalCategorie.get());
	        p.setFr(optionalFournisseur.get());
	        p.setProdId(optionalProduit.get().getProdId());
	        repoProd.save(p);

	        return ResponseEntity.noContent().build();
	    }
	

}
