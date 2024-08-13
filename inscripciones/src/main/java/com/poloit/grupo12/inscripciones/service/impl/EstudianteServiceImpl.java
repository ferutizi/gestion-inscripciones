package com.poloit.grupo12.inscripciones.service.impl;

import com.poloit.grupo12.inscripciones.model.Estudiante;
import com.poloit.grupo12.inscripciones.repository.EstudianteRepository;
import com.poloit.grupo12.inscripciones.service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstudianteServiceImpl implements EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Override
    public Estudiante save(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    @Override
    public Estudiante findById(Long id) {
        return estudianteRepository.findById(id).orElse(null);
    }

    @Override
    public Estudiante findByEmail(String email) {
        return estudianteRepository.findByEmail(email);
    }

    @Override
    public void deleteById(Long id) {
        estudianteRepository.deleteById(id);
    }
}