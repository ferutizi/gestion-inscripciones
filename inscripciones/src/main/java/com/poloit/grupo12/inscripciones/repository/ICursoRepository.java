package com.poloit.grupo12.inscripciones.repository;

import com.poloit.grupo12.inscripciones.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICursoRepository extends JpaRepository<Curso, Long> {
}
