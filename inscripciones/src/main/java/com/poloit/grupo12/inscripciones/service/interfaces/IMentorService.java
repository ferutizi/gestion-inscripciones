package com.poloit.grupo12.inscripciones.service.interfaces;

import com.poloit.grupo12.inscripciones.dto.MentorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
public interface IMentorService {
    public Page<MentorDTO> findAll(Pageable pageable);
    public MentorDTO findById(Long id);
    public MentorDTO save(MentorDTO mentorDTO);
    public MentorDTO update(Long id, MentorDTO mentorDTO);
    public void delete(Long id);

}
