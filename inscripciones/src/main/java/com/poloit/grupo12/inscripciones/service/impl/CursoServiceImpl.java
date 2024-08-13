package com.poloit.grupo12.inscripciones.service.impl;

import com.poloit.grupo12.inscripciones.dto.CursoDTO;
import com.poloit.grupo12.inscripciones.model.Curso;
import com.poloit.grupo12.inscripciones.repository.CursoRepository;
import com.poloit.grupo12.inscripciones.service.CursoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CursoServiceImpl implements CursoService {
    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Curso save(Curso curso) {
        return cursoRepository.save(curso);
    }

    @Override
    public Curso findById(Long id) {
        Curso curso = cursoRepository.findById(id).orElse(null);
        return modelMapper.map(curso, CursoDTO.class);
    }

    @Override
    public Curso findByNombre(String nombre) {
        return cursoRepository.findByNombre(nombre);
    }

    @Override
    public void deleteById(Long id) {
        cursoRepository.deleteById(id);
    }
}
