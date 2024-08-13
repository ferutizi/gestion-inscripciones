package com.poloit.grupo12.inscripciones.service;


import com.poloit.grupo12.inscripciones.model.Rol;
import com.poloit.grupo12.inscripciones.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    public Rol findById(Long id) {
        return rolRepository.findById(id).orElse(null);
    }
}
