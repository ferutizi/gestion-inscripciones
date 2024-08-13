package com.poloit.grupo12.inscripciones.service;

import com.poloit.grupo12.inscripciones.model.ONG;

public interface ONGService {
    ONG save(ONG ong);
    ONG findById(Long id);
    void deleteById(Long id);
}
