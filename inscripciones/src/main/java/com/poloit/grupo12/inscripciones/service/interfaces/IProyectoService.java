package com.poloit.grupo12.inscripciones.service.interfaces;

import com.poloit.grupo12.inscripciones.dto.ProyectoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProyectoService {
    Page<ProyectoDTO> findAll(Pageable pageable);
    ProyectoDTO findById(Long id);
    ProyectoDTO save(ProyectoDTO proyectoDTO);
    ProyectoDTO update(Long id, ProyectoDTO proyectoDTO);
    void delete(Long id);
}
