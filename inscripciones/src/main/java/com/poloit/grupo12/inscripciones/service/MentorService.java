package com.poloit.grupo12.inscripciones.service;

import com.poloit.grupo12.inscripciones.model.Mentor;

public interface MentorService {
    Mentor save(Mentor mentor);
    Mentor findById(Long id);
    void deleteById(Long id);
}
