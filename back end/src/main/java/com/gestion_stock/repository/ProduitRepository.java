package com.gestion_stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion_stock.model.Produit;

public interface ProduitRepository extends JpaRepository<Produit, Integer> {

}
