package com.gestion_stock.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User { 
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Integer userId;
	private String userNom;
	private String userLogin;
	private String userPassword;
	private String userRole;
	private int userStatut;
	
	
	//constructor
	public User() {
		
	}

	public User(Integer userId, String userNom, String userLogin, String userPassword, String userRole) {
		
		this.userId = userId;
		this.userNom = userNom;
		this.userLogin = userLogin;
		this.userPassword = userPassword;
		this.userRole = userRole;
		this.userStatut = 0;
	}
	
	
	public User(String userNom, String userLogin, String userPassword, String userRole) {
		
		this.userNom = userNom;
		this.userLogin = userLogin;
		this.userPassword = userPassword;
		this.userRole = userRole;
		this.userStatut = 0;
	}

	
	//getter
	public Integer getUserId() {
		return userId;
	}

	public String getUserNom() {
		return userNom;
	}

	public String getUserLogin() {
		return userLogin;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public String getUserRole() {
		return userRole;
	}

	public int getUserStatut() {
		return userStatut;
	}

	
	//setters
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public void setUserNom(String userNom) {
		this.userNom = userNom;
	}

	public void setUserLogin(String userLogin) {
		this.userLogin = userLogin;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

	public void setUserStatut(int userStatut) {
		this.userStatut = userStatut;
	}
	
	
	
	
	

}
