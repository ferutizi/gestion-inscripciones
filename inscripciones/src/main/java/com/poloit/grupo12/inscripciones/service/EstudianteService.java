package com.poloit.grupo12.inscripciones.service;

import com.poloit.grupo12.inscripciones.model.Estudiante;

public interface EstudianteService {
    Estudiante save(Estudiante estudiante);
    Estudiante findById(Long id);
    Estudiante findByEmail(String email);
    void deleteById(Long id);
}
