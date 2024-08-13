package com.poloit.grupo12.inscripciones.service.impl;

import com.poloit.grupo12.inscripciones.model.Mentor;
import com.poloit.grupo12.inscripciones.repository.MentorRepository;
import com.poloit.grupo12.inscripciones.service.MentorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MentorServiceImpl implements MentorService {

    @Autowired
    private MentorRepository mentorRepository;

    @Override
    public Mentor save(Mentor mentor) {
        return mentorRepository.save(mentor);
    }

    @Override
    public Mentor findById(Long id) {
        return mentorRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        mentorRepository.deleteById(id);
    }
}
