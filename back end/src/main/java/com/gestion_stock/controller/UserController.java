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

import com.gestion_stock.model.User;
import com.gestion_stock.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	UserService service;
	
	
	//afficher la liste des utilisateurs
	@GetMapping("/utilisateur")
	public List<User>getUser(){
		return service.getUser();
	}
	
	//ajouter  d'un utilisateur en vérifiant que son login est unique.
	@PostMapping("/utilisateur/enregistrer")
	public User registerUser(@RequestBody User user) throws Exception {
		String tempLogin = user.getUserLogin();
		
		if(tempLogin != null && !"".equals(tempLogin)) {
			User userobj = service.fetchUserByLogin(tempLogin);
	 		if(userobj != null) {
				throw new Exception("un utilisateur avec le login: "+tempLogin+" existe");
			}
		}
		User userObjet = null;
		userObjet = service.saveUser(user);
		return userObjet;
	}
	
	
	//recherche d'un utilisateur via son login et son mot de passe
	@PostMapping("/utilisateur/connexion")
	public User loginUser(@RequestBody User user) throws Exception {
		String templogin = user.getUserLogin();
		String tempPassword = user.getUserPassword();
		User userObj = null;
		if(templogin != null && tempPassword != null) {
			userObj = service.fetchUserByLoginAndPassword(templogin, tempPassword);
		}
		if(userObj == null) {
			throw new Exception("Aucun utilisateur ne correspond");
		}
		return userObj;
	}
	
	//mettre à jour le statu et le mot de passe de l'utilisateur
	@PutMapping("/utilisateur/password/statu")
	public User updateUserStatu(@RequestBody User user) {
		int tempStatu = user.getUserStatut();
		if(tempStatu == 0) {
			user.setUserStatut(1);
			return service.saveUser(user);
		}else {
			return user;
		}
	}
	
	//mettre à jour uniquement le mot de passe de l'utilisateur
	@PutMapping("/utilisateur/changepassword")
	public User updatePassword(@RequestBody User user)throws Exception {
		String templogin = user.getUserLogin();
		String tempPassword = user.getUserPassword();
		User userObj = service.fetchUserByLogin(templogin);
		if(userObj == null) {
			throw new Exception("Aucun utilisateur ne correspond");
		}
		userObj.setUserPassword(tempPassword);
		return service.saveUser(userObj);
	}
	
	//mettre à jour les données d'un utilisateur en fonction de son id
	@PutMapping("/utilisateur/{id}/edit")
	public User updateUser(@PathVariable("id") Integer id, @RequestBody User user) {
		return service.updateUser(id, user);
	}
	
	
	//supprimer un utilisateur
	@DeleteMapping("/utilisateur/{id}/supprimer")
	public void deleteUsr(@PathVariable("id") Integer id) {
		service.deleteUser(id);
	}
	

}
