package com.gestion_stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion_stock.model.CommandeFournisseur;

public interface CommandeFournisseurRepository extends JpaRepository<CommandeFournisseur, Integer> {

}
