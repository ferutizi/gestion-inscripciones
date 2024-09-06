package com.poloit.grupo12.inscripciones.service.implementacion;

import com.poloit.grupo12.inscripciones.dto.EstudianteDTO;
import com.poloit.grupo12.inscripciones.model.Estudiante;
import com.poloit.grupo12.inscripciones.model.Usuario;
import com.poloit.grupo12.inscripciones.repository.IEstudianteRepository;
import com.poloit.grupo12.inscripciones.repository.IUsuarioRepository;
import com.poloit.grupo12.inscripciones.service.interfaces.IEstudianteService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class EstudianteService implements IEstudianteService {
    @Autowired
    private IEstudianteRepository estudianteRepository;

    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Override
    public Page<EstudianteDTO> findAll(Pageable pageable) {
        Page<Estudiante> estudiantes = estudianteRepository.findAll(pageable);
        return estudiantes.map(this::convertToDto);
    }

    @Override
    public EstudianteDTO findById(Long id) {
        ModelMapper mapper = new ModelMapper();
        Optional<Estudiante> optEstudiante = estudianteRepository.findById(id);
        return optEstudiante.map(this::convertToDto).orElse(null);
    }

    @Override
    public EstudianteDTO save(EstudianteDTO estudianteDTO) {
        ModelMapper mapper = new ModelMapper();
        Estudiante estudiante = mapper.map(estudianteDTO, Estudiante.class);
        Usuario usuario = usuarioRepository.findById(estudianteDTO.getUsuarioId()).orElse(null);
        if (usuario != null) {
            estudiante.setUsuario(usuario);
            Estudiante nuevoEstudiante = estudianteRepository.save(estudiante);
            return convertToDto(nuevoEstudiante);
        }
        return null;
    }

    @Override
    public EstudianteDTO update(Long id, EstudianteDTO estudianteDTO) {
        ModelMapper mapper = new ModelMapper();
        Estudiante estudiante = mapper.map(estudianteDTO, Estudiante.class);
        estudiante.setId(id);
        Usuario usuario = usuarioRepository.findById(estudianteDTO.getUsuarioId()).orElse(null);
        if (usuario != null) {
            estudiante.setUsuario(usuario);
            Estudiante nuevoEstudiante = estudianteRepository.save(estudiante);
            return convertToDto(nuevoEstudiante);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        estudianteRepository.deleteById(id);
    }

    private EstudianteDTO convertToDto(Estudiante estudiante) {
        ModelMapper mapper = new ModelMapper();
        EstudianteDTO estudianteDTO = mapper.map(estudiante, EstudianteDTO.class);
        estudianteDTO.setUsuarioId(estudiante.getUsuario().getId());
        estudianteDTO.setNombreUsuario(estudiante.getUsuario().getNombre());
        estudianteDTO.setApellidoUsuario(estudiante.getUsuario().getApellido());
        return estudianteDTO;
    }
}
