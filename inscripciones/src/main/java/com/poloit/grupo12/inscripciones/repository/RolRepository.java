package com.poloit.grupo12.inscripciones.repository;

import com.poloit.grupo12.inscripciones.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolRepository extends JpaRepository<Rol, Long> {
    Rol findByDescripcion(String descripcion);
}
