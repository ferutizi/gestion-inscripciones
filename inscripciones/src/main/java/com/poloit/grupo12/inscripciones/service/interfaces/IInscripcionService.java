package com.poloit.grupo12.inscripciones.service.interfaces;

import com.poloit.grupo12.inscripciones.dto.InscripcionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IInscripcionService {
    Page<InscripcionDTO> findAll(Pageable pageable);
    InscripcionDTO findById(Long id);
    InscripcionDTO save(InscripcionDTO inscripcionDTO);
    InscripcionDTO update(Long id, InscripcionDTO inscripcionDTO);
    void delete(Long id);
}