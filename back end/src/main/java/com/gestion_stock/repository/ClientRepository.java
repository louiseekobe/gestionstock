package com.gestion_stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion_stock.model.Client;

public interface ClientRepository extends JpaRepository<Client, Integer>{
	
	public Client findByClTel(String clTel);
	
	
	public Client findByClemail(String clemail);

}
