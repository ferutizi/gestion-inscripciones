package com.poloit.grupo12.inscripciones.repository;

import com.poloit.grupo12.inscripciones.model.Credencial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CredencialRepository extends JpaRepository<Credencial, Long> {
}
