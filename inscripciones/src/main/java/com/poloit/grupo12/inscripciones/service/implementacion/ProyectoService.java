package com.poloit.grupo12.inscripciones.service.implementacion;

import com.poloit.grupo12.inscripciones.dto.ProyectoDTO;
import com.poloit.grupo12.inscripciones.model.Proyecto;
import com.poloit.grupo12.inscripciones.repository.IProyectoRepository;
import com.poloit.grupo12.inscripciones.service.interfaces.IProyectoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProyectoService implements IProyectoService {

    @Autowired
    private IProyectoRepository proyectoRepository;

    @Override
    public Page<ProyectoDTO> findAll(Pageable pageable) {
        Page<Proyecto> proyectos = proyectoRepository.findAll(pageable);
        return proyectos.map(this::convertToDto);
    }

    @Override
    public ProyectoDTO findById(Long id) {
        Optional<Proyecto> optProyecto = proyectoRepository.findById(id);
        return optProyecto.map(this::convertToDto).orElse(null);
    }

    @Override
    public ProyectoDTO save(ProyectoDTO proyectoDTO) {
        ModelMapper mapper = new ModelMapper();
        Proyecto proyecto = mapper.map(proyectoDTO, Proyecto.class);
        Proyecto nuevoProyecto = proyectoRepository.save(proyecto);
        return convertToDto(nuevoProyecto);
    }

    @Override
    public ProyectoDTO update(Long id, ProyectoDTO proyectoDTO) {
        ModelMapper mapper = new ModelMapper();
        Proyecto proyecto = mapper.map(proyectoDTO, Proyecto.class);
        proyecto.setId(id);
        Proyecto proyectoEditado = proyectoRepository.save(proyecto);
        return convertToDto(proyectoEditado);
    }

    @Override
    public void delete(Long id) {
        proyectoRepository.deleteById(id);
    }

    private ProyectoDTO convertToDto(Proyecto proyecto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(proyecto, ProyectoDTO.class);
    }
}
