package com.poloit.grupo12.inscripciones.repository;

import com.poloit.grupo12.inscripciones.model.Proyecto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProyectoRepository extends JpaRepository<Proyecto, Long> {

    // Método para obtener los proyectos limitados según un Pageable (paginación)
    @Query("SELECT p FROM Proyecto p ORDER BY p.fechaCreacion DESC")
    List<Proyecto> findProyectosLimitados(Pageable pageable);
}
