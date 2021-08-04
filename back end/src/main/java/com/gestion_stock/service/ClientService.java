package com.gestion_stock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.gestion_stock.model.Client;
import com.gestion_stock.repository.ClientRepository;

@Service
public class ClientService implements WebMvcConfigurer{
	
	@Autowired
	ClientRepository repo;
	
	//afficher la liste des clients
	public List<Client>getClient(){
		return repo.findAll();
	}

	//ajouter un client
	public Client saveClient(Client cl) {
		return repo.save(cl);
	}
	
	//rechercher client par tel
	public Client fetchClientByTel(String tel) {
		return repo.findByClTel(tel);
	}
	
	
	//rechercher client par email
	public Client fetchClientByEmail(String email) {
		return repo.findByClemail(email);
	}
	
	
		
	//mettre a jour un client
	public Client updateClient(Integer id, Client cl) {
		cl.setClId(id);
		return repo.save(cl);
	}
		
	//supprimer un client
	public void deleteClient(Integer id) {
		repo.deleteById(id);
	}
	
	
	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("*");
    }
	

}
