package com.poloit.grupo12.inscripciones.service;

import com.poloit.grupo12.inscripciones.model.Inscripcion;

public interface InscripcionService {
    Inscripcion save(Inscripcion inscripcion);
    Inscripcion findById(Long id);
    void deleteById(Long id);
}
