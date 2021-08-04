package com.gestion_stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion_stock.model.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie, Integer>{
	
	public Categorie findByCatNom(String catNom);

}
