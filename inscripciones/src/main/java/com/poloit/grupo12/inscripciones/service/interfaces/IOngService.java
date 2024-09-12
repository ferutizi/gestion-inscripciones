package com.poloit.grupo12.inscripciones.service.interfaces;

import com.poloit.grupo12.inscripciones.dto.OngDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
public interface IOngService {
    public Page<OngDTO> findAll(Pageable pageable);
    public OngDTO findById(Long id);
    public OngDTO save(OngDTO ongDTO);
    public OngDTO update(Long id, OngDTO ongDTO);
    public void delete(Long id);

}
