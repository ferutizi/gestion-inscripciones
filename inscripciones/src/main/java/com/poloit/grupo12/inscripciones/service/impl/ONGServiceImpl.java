package com.poloit.grupo12.inscripciones.service.impl;

import com.poloit.grupo12.inscripciones.model.ONG;
import com.poloit.grupo12.inscripciones.repository.ONGRepository;
import com.poloit.grupo12.inscripciones.service.ONGService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ONGServiceImpl implements ONGService {

    @Autowired
    private ONGRepository ongRepository;

    @Override
    public ONG save(ONG ong) {
        return ongRepository.save(ong);
    }

    @Override
    public ONG findById(Long id) {
        return ongRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        ongRepository.deleteById(id);
    }
}
