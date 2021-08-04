package com.gestion_stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion_stock.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	public User findByUserLogin(String userLogin);
	
	public User findByUserLoginAndUserPassword(String userLogin, String userPassword);
	

}
