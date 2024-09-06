package com.poloit.grupo12.inscripciones.service.interfaces;

import com.poloit.grupo12.inscripciones.dto.CursoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
public interface ICursoService {
    public Page<CursoDTO> findAll(Pageable pageable);
    public CursoDTO findById(Long id);
    public CursoDTO save(CursoDTO cursoDTO);
    public CursoDTO update(Long id, CursoDTO cursoDTO);
    public void delete(Long id);
}
