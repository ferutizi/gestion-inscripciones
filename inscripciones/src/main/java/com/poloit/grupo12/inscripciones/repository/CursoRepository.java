package com.poloit.grupo12.inscripciones.repository;

import com.poloit.grupo12.inscripciones.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    Curso findByNombre(String nombre);
}
