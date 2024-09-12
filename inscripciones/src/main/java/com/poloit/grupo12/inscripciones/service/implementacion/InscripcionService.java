package com.poloit.grupo12.inscripciones.service.implementacion;

import com.poloit.grupo12.inscripciones.dto.InscripcionDTO;
import com.poloit.grupo12.inscripciones.model.Inscripcion;
import com.poloit.grupo12.inscripciones.model.Curso;
import com.poloit.grupo12.inscripciones.model.Estudiante;
import com.poloit.grupo12.inscripciones.repository.IInscripcionRepository;
import com.poloit.grupo12.inscripciones.repository.ICursoRepository;
import com.poloit.grupo12.inscripciones.repository.IEstudianteRepository;
import com.poloit.grupo12.inscripciones.service.interfaces.IInscripcionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InscripcionService implements IInscripcionService {

    @Autowired
    private IInscripcionRepository inscripcionRepository;

    @Autowired
    private ICursoRepository cursoRepository;

    @Autowired
    private IEstudianteRepository estudianteRepository;

    @Override
    public Page<InscripcionDTO> findAll(Pageable pageable) {
        Page<Inscripcion> inscripciones = inscripcionRepository.findAll(pageable);
        return inscripciones.map(this::convertToDto);
    }

    @Override
    public InscripcionDTO findById(Long id) {
        Optional<Inscripcion> optInscripcion = inscripcionRepository.findById(id);
        return optInscripcion.map(this::convertToDto).orElse(null);
    }

    @Override
    public InscripcionDTO save(InscripcionDTO inscripcionDTO) {
        ModelMapper mapper = new ModelMapper();
        Inscripcion inscripcion = mapper.map(inscripcionDTO, Inscripcion.class);

        Curso curso = cursoRepository.findById(inscripcionDTO.getCursoId()).orElse(null);
        Estudiante estudiante = estudianteRepository.findById(inscripcionDTO.getEstudianteId()).orElse(null);

        if (curso != null && estudiante != null) {
            inscripcion.setCurso(curso);
            inscripcion.setEstudiante(estudiante);
            Inscripcion nuevaInscripcion = inscripcionRepository.save(inscripcion);
            return convertToDto(nuevaInscripcion);
        }

        return null;
    }

    @Override
    public InscripcionDTO update(Long id, InscripcionDTO inscripcionDTO) {
        ModelMapper mapper = new ModelMapper();
        Inscripcion inscripcion = mapper.map(inscripcionDTO, Inscripcion.class);
        inscripcion.setId(id);

        Curso curso = cursoRepository.findById(inscripcionDTO.getCursoId()).orElse(null);
        Estudiante estudiante = estudianteRepository.findById(inscripcionDTO.getEstudianteId()).orElse(null);

        if (curso != null && estudiante != null) {
            inscripcion.setCurso(curso);
            inscripcion.setEstudiante(estudiante);
            Inscripcion nuevaInscripcion = inscripcionRepository.save(inscripcion);
            return convertToDto(nuevaInscripcion);
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        inscripcionRepository.deleteById(id);
    }

    private InscripcionDTO convertToDto(Inscripcion inscripcion) {
        ModelMapper mapper = new ModelMapper();
        InscripcionDTO inscripcionDTO = mapper.map(inscripcion, InscripcionDTO.class);
        inscripcionDTO.setCursoId(inscripcion.getCurso().getId());
        inscripcionDTO.setEstudianteId(inscripcion.getEstudiante().getId());
        return inscripcionDTO;
    }
}
