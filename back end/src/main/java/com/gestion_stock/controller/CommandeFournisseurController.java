package com.gestion_stock.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

import com.gestion_stock.model.CommandeFournisseur;
import com.gestion_stock.model.Fournisseur;
import com.gestion_stock.model.LigneCmdFr;
import com.gestion_stock.model.Produit;
import com.gestion_stock.repository.CommandeFournisseurRepository;
import com.gestion_stock.repository.FournisseurRepository;
import com.gestion_stock.repository.ProduitRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CommandeFournisseurController {
	
	FournisseurRepository repofr;
	CommandeFournisseurRepository repoCmd;
	ProduitRepository repoProd;
	
	@Autowired
	public CommandeFournisseurController(FournisseurRepository repofr, CommandeFournisseurRepository repoCmd, ProduitRepository repoProd) {
		this.repofr = repofr;
		this.repoCmd = repoCmd;
		this.repoProd = repoProd;
	}
	
	
	//afficher la liste des produits
		@GetMapping("/commande/fournisseur")
		/*public ResponseEntity<Page<CommandeFournisseur>> getAll(Pageable pageable) {
	        return ResponseEntity.ok(repoCmd.findAll(pageable));
	    }*/
		public List<CommandeFournisseur>getCommandeFournisseur(){
			return repoCmd.findAll();
		}
		
		
		//ajouter un produit
		 @PostMapping("/commande/fournisseur/enregistrer")
		 public ResponseEntity<CommandeFournisseur> create(@RequestBody @Valid CommandeFournisseur cmd) {
		        Optional<Fournisseur> optionalFournisseur = repofr.findById(cmd.getFr().getFrId());
		        if (!optionalFournisseur.isPresent()) {
		            return ResponseEntity.unprocessableEntity().build();
		        }
		        cmd.setFr(optionalFournisseur.get());
		        Set<LigneCmdFr> listLigne = cmd.getListLigne();
		        double montant = 0;
		        int qte = 0;
		        for (LigneCmdFr lg : listLigne) {
					Produit p = repoProd.findById(lg.getNumProd()).get();
					qte = p.getQuantite()+lg.getQuantitecmd();
					p.setQuantite(qte);
					repoProd.save(p);
					montant += p.getPrixachat()*lg.getQuantitecmd();
				}
		        cmd.setMontant(montant);
		       CommandeFournisseur savedcmd = repoCmd.save(cmd);
		        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
		            .buildAndExpand(savedcmd.getCdfrId()).toUri();

		        return ResponseEntity.created(location).body(savedcmd);
		    }
		
		 
		//supprimer un produit
		 @DeleteMapping("/commande/fournisseur/{id}/supprimer")
		 public ResponseEntity<CommandeFournisseur> delete(@PathVariable Integer id) {
			 Optional<CommandeFournisseur> optionalProduit = repoCmd.findById(id);
			 if (!optionalProduit.isPresent()) {
		            return ResponseEntity.unprocessableEntity().build();
		        }

		       repoCmd.delete(optionalProduit.get());

		        return ResponseEntity.noContent().build();
		    }
		
		 
		//mettre à jour un produit
		 @PutMapping("/commande/fournisseur/{id}/edit")
		 public ResponseEntity<CommandeFournisseur> update(@RequestBody @Valid CommandeFournisseur cmd, @PathVariable Integer id) {
		      Optional<Fournisseur> optionalFournisseur = repofr.findById(cmd.getFr().getFrId());
		      
		      if (!optionalFournisseur.isPresent()) {
		            return ResponseEntity.unprocessableEntity().build();
		        }
		      Optional<CommandeFournisseur> optionalProduit = repoCmd.findById(id);
		       if (!optionalProduit.isPresent()) {
		            return ResponseEntity.unprocessableEntity().build();
		        }
		       	
		       CommandeFournisseur cmd1 = optionalProduit.get();
		       Set<LigneCmdFr> listLigne1 = cmd1.getListLigne(); 
		       
		       Set<LigneCmdFr> listLigne = cmd.getListLigne();
		        double montant = 0;
		        int qte = 0;
		        int dif = 0;
		        for (LigneCmdFr lg1 : listLigne1) {
		        	for(LigneCmdFr lg : listLigne) {
		        		if(lg1.getLcmdfrId() == lg.getLcmdfrId()) {
		        			if(lg1.getQuantitecmd() > lg.getQuantitecmd()) {
		        				dif = lg1.getQuantitecmd() - lg.getQuantitecmd();
		        				Produit p = repoProd.findById(lg1.getNumProd()).get();
		        				qte = p.getQuantite()- dif;
		        				p.setQuantite(qte);
		    					repoProd.save(p);
		    					montant += p.getPrixachat()*lg.getQuantitecmd();
		        			}else {
		        				dif = lg.getQuantitecmd() - lg1.getQuantitecmd();
		        				Produit p = repoProd.findById(lg1.getNumProd()).get();
		        				qte = p.getQuantite()+ dif;
		        				p.setQuantite(qte);
		    					repoProd.save(p);
		    					montant += p.getPrixachat()*lg.getQuantitecmd();
		        			}
		        		}
		        	}
				}
		        cmd.setMontant(montant);
		        
		        cmd.setFr(optionalFournisseur.get());
		        cmd.setCdfrId(optionalProduit.get().getCdfrId());
		        repoCmd.save(cmd);

		        return ResponseEntity.noContent().build();
		    }
		 
	

}
