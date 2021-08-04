package com.gestion_stock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.gestion_stock.model.User;
import com.gestion_stock.repository.UserRepository;

@Service
public class UserService implements WebMvcConfigurer{
	
	@Autowired
	UserRepository repo;
	
	//afficher la liste des utilisateurs
	public List<User>getUser(){
		return repo.findAll();
	}
	
   //enregistrement des utilisateur
	public User saveUser(User user) {
		return repo.save(user);
	}
	
	//rechercher les utilisateur par leur login
	public User fetchUserByLogin(String login) {
		return repo.findByUserLogin(login);
	}
	
	//rechercher les utilisateur par leur login et leur mot de passe
	public User fetchUserByLoginAndPassword(String login, String password) {
		return repo.findByUserLoginAndUserPassword(login, password);
	}
	
	
	//mettre a jour les données d'un utilisater
	public User updateUser(Integer id, User user) {
		user.setUserId(id);
		return repo.save(user);
	}
	
	//supprimer un utilisateur 
	public void deleteUser(Integer id) {
		repo.deleteById(id);
	}
	
	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("*");
    }
	

}
