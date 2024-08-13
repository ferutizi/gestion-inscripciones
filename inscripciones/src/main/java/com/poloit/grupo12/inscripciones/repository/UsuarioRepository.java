package com.poloit.grupo12.inscripciones.repository;

import com.poloit.grupo12.inscripciones.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
}
