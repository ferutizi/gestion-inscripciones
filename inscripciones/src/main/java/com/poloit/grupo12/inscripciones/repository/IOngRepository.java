package com.poloit.grupo12.inscripciones.repository;

import com.poloit.grupo12.inscripciones.model.Ong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOngRepository extends JpaRepository<Ong, Long> {
}
