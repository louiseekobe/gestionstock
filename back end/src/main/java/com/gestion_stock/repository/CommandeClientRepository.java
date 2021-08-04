package com.gestion_stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion_stock.model.CommandeClient;

public interface CommandeClientRepository extends JpaRepository<CommandeClient, Integer>{

}
