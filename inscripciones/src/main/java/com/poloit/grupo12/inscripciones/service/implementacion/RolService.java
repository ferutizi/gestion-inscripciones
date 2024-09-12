package com.poloit.grupo12.inscripciones.service.implementacion;

import com.poloit.grupo12.inscripciones.service.interfaces.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.poloit.grupo12.inscripciones.model.Rol;
import com.poloit.grupo12.inscripciones.repository.IRolRepository;

@Service
public class RolService implements IRolService {

    @Autowired
    private IRolRepository rolRepository;

    public Rol findById(Long id) {
        return rolRepository.findById(id).orElse(null);
    }
}
