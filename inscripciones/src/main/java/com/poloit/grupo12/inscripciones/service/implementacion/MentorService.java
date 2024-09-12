package com.poloit.grupo12.inscripciones.service.implementacion;

import com.poloit.grupo12.inscripciones.dto.MentorDTO;
import com.poloit.grupo12.inscripciones.model.Mentor;
import com.poloit.grupo12.inscripciones.model.Usuario;
import com.poloit.grupo12.inscripciones.repository.IMentorRepository;
import com.poloit.grupo12.inscripciones.repository.IUsuarioRepository;
import com.poloit.grupo12.inscripciones.service.interfaces.IMentorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class MentorService implements IMentorService {
    @Autowired
    private IMentorRepository mentorRepository;

    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Override
    public Page<MentorDTO> findAll(Pageable pageable) {
        Page<Mentor> mentores = mentorRepository.findAll(pageable);
        return mentores.map(this::convertToDto);
    }

    @Override
    public MentorDTO findById(Long id) {
        ModelMapper mapper = new ModelMapper();
        Optional<Mentor> optMentor = mentorRepository.findById(id);
        return optMentor.map(this::convertToDto).orElse(null);
    }

    @Override
    public MentorDTO save(MentorDTO mentorDTO) {
        ModelMapper mapper = new ModelMapper();
        Mentor mentor = mapper.map(mentorDTO, Mentor.class);
        Usuario usuario = usuarioRepository.findById(mentorDTO.getUsuarioId()).orElse(null);
        if (usuario != null) {
            mentor.setUsuario(usuario);
            Mentor nuevoMentor = mentorRepository.save(mentor);
            return convertToDto(nuevoMentor);
        }
        return null;
    }

    @Override
    public MentorDTO update(Long id, MentorDTO mentorDTO) {
        ModelMapper mapper = new ModelMapper();
        Mentor mentor = mapper.map(mentorDTO, Mentor.class);
        mentor.setId(id);
        Usuario usuario = usuarioRepository.findById(mentorDTO.getUsuarioId()).orElse(null);
        if (usuario != null) {
            mentor.setUsuario(usuario);
            Mentor nuevoMentor = mentorRepository.save(mentor);
            return convertToDto(nuevoMentor);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        mentorRepository.deleteById(id);
    }
    private MentorDTO convertToDto(Mentor mentor) {
        ModelMapper mapper = new ModelMapper();
        MentorDTO mentorDTO = mapper.map(mentor, MentorDTO.class);
        mentorDTO.setUsuarioId(mentor.getUsuario().getId());
        mentorDTO.setNombreUsuario(mentor.getUsuario().getNombre());
        mentorDTO.setApellidoUsuario(mentor.getUsuario().getApellido());
        return mentorDTO;
    }
}
