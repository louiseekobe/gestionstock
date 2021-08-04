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

import com.gestion_stock.model.Client;
import com.gestion_stock.repository.ClientRepository;
import com.gestion_stock.service.ClientService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ClientController {
	
	@Autowired
	ClientService service;
	@Autowired
	ClientRepository repo;
	
	//afficher la liste des clients
	@GetMapping("/client")
	public List<Client>getClient(){
		return repo.findAll();
	}
	

	//ajouter un client
	 @PostMapping("/client/enregistrer")
	 public Client registerClient(@RequestBody Client client)  throws Exception{
		 String tempTel = client.getClTel();
		 String tempEmail = client.getClemail();
		 if(tempEmail != null && !tempEmail.equals("")) {
			 Client cl = service.fetchClientByEmail(tempEmail);
			 if(cl != null) {
				 throw new Exception("ce email: "+tempEmail+" existe déjà");
			 }
		 }
		 if(tempTel != null && !tempTel.equals("")) {
			 Client cl = service.fetchClientByTel(tempTel);
			 if(cl != null) {
				 throw new Exception("ce numéro de téléphone : "+tempTel+" existe déjà");
			 }
		 }
		 Client clObj = null;
		 clObj = service.saveClient(client);
		 return clObj;
		 
	 }
	 
	
	//mettre a jour un client
	 @PutMapping("/client/{id}/edit")
	 public Client updateClient(@PathVariable("id") Integer id, @RequestBody Client cl) {
		 return service.updateClient(id, cl);
	 }
	 
	
	//supprimer un client
	 @DeleteMapping("/client/{id}/supprimer")
	 public void deleteClient(@PathVariable("id") Integer id) {
		 service.deleteClient(id);
	 }

}
