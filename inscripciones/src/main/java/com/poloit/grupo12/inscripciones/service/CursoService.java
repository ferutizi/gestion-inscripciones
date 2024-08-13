package com.poloit.grupo12.inscripciones.service;

import com.poloit.grupo12.inscripciones.dto.CursoDTO;
import com.poloit.grupo12.inscripciones.model.Curso;

public interface CursoService {
    Curso save(CursoDTO cursoDTO);
    Curso findById(Long id);
    Curso findByNombre(String nombre);
    void deleteById(Long id);
}
