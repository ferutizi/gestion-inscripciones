package com.poloit.grupo12.inscripciones.service.interfaces;

import com.poloit.grupo12.inscripciones.dto.EstudianteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IEstudianteService {
    public Page<EstudianteDTO> findAll(Pageable pageable);
    public EstudianteDTO findById(Long id);
    public EstudianteDTO save(EstudianteDTO estudianteDTO);
    public EstudianteDTO update(Long id, EstudianteDTO estudianteDTO);
    public void delete(Long id);
}
