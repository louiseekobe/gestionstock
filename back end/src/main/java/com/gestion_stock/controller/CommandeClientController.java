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

import com.gestion_stock.model.Client;
import com.gestion_stock.model.CommandeClient;
import com.gestion_stock.model.LigneCmdClient;
import com.gestion_stock.model.Produit;
import com.gestion_stock.repository.ClientRepository;
import com.gestion_stock.repository.CommandeClientRepository;
import com.gestion_stock.repository.LigneCommandeClientRepository;
import com.gestion_stock.repository.ProduitRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CommandeClientController {
	
	ClientRepository repoCl;;
	CommandeClientRepository repoCmd;
	ProduitRepository repoProd;
	LigneCommandeClientRepository repoLcmdCl;
	
	@Autowired
	public CommandeClientController(ClientRepository repoCl, CommandeClientRepository repoCmd,
			ProduitRepository repoProd, LigneCommandeClientRepository repoLcmdCl) {
		this.repoCl = repoCl;
		this.repoCmd = repoCmd;
		this.repoProd = repoProd;
		this.repoLcmdCl = repoLcmdCl;
	}
	
	
	//afficher la liste des produits
		@GetMapping("/commande/client")
		/*public ResponseEntity<Page<CommandeClient>> getAll(Pageable pageable) {
	        return ResponseEntity.ok(repoCmd.findAll(pageable));
	    }*/
		public List<CommandeClient>getCommandeClient(){
			return repoCmd.findAll();
		}
		

	//ajouter un produit
	@PostMapping("/commande/client/enregistrer")
	public ResponseEntity<CommandeClient> create(@RequestBody @Valid CommandeClient cmd) {
		 	Optional<Client> optionalFournisseur = repoCl.findById(cmd.getCl().getClId());
		        if (!optionalFournisseur.isPresent()) {
		            return ResponseEntity.unprocessableEntity().build();
		        }
		        cmd.setCl(optionalFournisseur.get());
		        Set<LigneCmdClient> listLigne = cmd.getListLigne();
		        double montant = 0;
		        int qte = 0;
		        for (LigneCmdClient lg : listLigne) {
					Produit p = repoProd.findById(lg.getNumProd()).get();
					if(p.getQuantite() >= lg.getQuantitecmd()) {
						qte = p.getQuantite()-lg.getQuantitecmd();
					}else {
						return ResponseEntity.unprocessableEntity().build();
					}
					p.setQuantite(qte);
					repoProd.save(p);
					montant += p.getPrixvente()*lg.getQuantitecmd();
				}
		        cmd.setMontant(montant);
		       CommandeClient savedcmd = repoCmd.save(cmd);
		        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
		            .buildAndExpand(savedcmd.getCdId()).toUri();

		        return ResponseEntity.created(location).body(savedcmd);
		    }
		
		 
		//supprimer un produit
		 @DeleteMapping("/commande/client/{id}/supprimer")
		 public ResponseEntity<CommandeClient> delete(@PathVariable Integer id) {
			 Optional<CommandeClient> optionalProduit = repoCmd.findById(id);
			 if (!optionalProduit.isPresent()) {
		            return ResponseEntity.unprocessableEntity().build();
		        }

		       repoCmd.delete(optionalProduit.get());

		        return ResponseEntity.noContent().build();
		    }
		
		 
		//mettre à jour un produit
		 @PutMapping("/commande/client/{id}/edit")
		 public ResponseEntity<CommandeClient> update(@RequestBody @Valid CommandeClient cmd, @PathVariable Integer id) {
		      Optional<Client> optionalFournisseur = repoCl.findById(cmd.getCl().getClId());
		      
		      if (!optionalFournisseur.isPresent()) {
		            return ResponseEntity.unprocessableEntity().build();
		        }
		      Optional<CommandeClient> optionalProduit = repoCmd.findById(id);
		       if (!optionalProduit.isPresent()) {
		            return ResponseEntity.unprocessableEntity().build();
		        }
		       	
		       CommandeClient cmd1 = optionalProduit.get();
		       Set<LigneCmdClient> listLigne1 = cmd1.getListLigne(); 
		       
		       Set<LigneCmdClient> listLigne = cmd.getListLigne();
		        double montant = 0;
		        int qte = 0;
		        int dif = 0;
		        for (LigneCmdClient lg1 : listLigne1) {
		        	for(LigneCmdClient lg : listLigne) {
		        		if(lg1.getNumProd() == lg.getNumProd()) {
		        			if(lg1.getQuantitecmd() > lg.getQuantitecmd()) {
		        				dif = lg1.getQuantitecmd() - lg.getQuantitecmd();
		        				Produit p = repoProd.findById(lg1.getNumProd()).get();
		        				qte = p.getQuantite()+ dif;
		        				p.setQuantite(qte);
		    					repoProd.save(p);
		    					montant += p.getPrixvente()*lg.getQuantitecmd();
		    					lg.setLcmdClId(lg1.getLcmdClId());
		    					repoLcmdCl.save(lg);
		        			}else {
		        				dif = lg.getQuantitecmd() - lg1.getQuantitecmd();
		        				Produit p = repoProd.findById(lg1.getNumProd()).get();
		        				if(p.getQuantite() < lg.getQuantitecmd()) {
		    						return ResponseEntity.unprocessableEntity().build();
		    					}
		        				qte = p.getQuantite()- dif;
		        				p.setQuantite(qte);
		    					repoProd.save(p);
		    					montant += p.getPrixvente()*lg.getQuantitecmd();
		    					lg.setLcmdClId(lg1.getLcmdClId());
		    					repoLcmdCl.save(lg);
		        			}
		        		}
		        	}
				}
		        cmd.setMontant(montant);
		        
		        cmd.setCl(optionalFournisseur.get());
		        cmd.setCdId(optionalProduit.get().getCdId());
		        repoCmd.save(cmd);

		        return ResponseEntity.noContent().build();
		    }
		 
	

}
