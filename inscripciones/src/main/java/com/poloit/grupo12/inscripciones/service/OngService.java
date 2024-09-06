package com.poloit.grupo12.inscripciones.service;

import com.poloit.grupo12.inscripciones.dto.OngDTO;
import com.poloit.grupo12.inscripciones.model.Ong;
import com.poloit.grupo12.inscripciones.model.Rol;
import com.poloit.grupo12.inscripciones.repository.IOngRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class OngService implements IOngService {

    @Autowired
    private IOngRepository repository;
    @Override
    public List<OngDTO> findAll() {
        ModelMapper mapper = new ModelMapper();
        return repository.findAll()
                .stream()
                .map(entity -> mapper.map(entity, OngDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public OngDTO findById(Long id) {
        ModelMapper mapper = new ModelMapper();
        Optional<Ong> optOng = repository.findById(id);
        if (optOng.isPresent()) {
            Ong ong = optOng.get();
            return mapper.map(ong, OngDTO.class);
        } else {
            return null;
        }
    }

    @Override
    public OngDTO save(OngDTO ongDTO) {
        ModelMapper mapper = new ModelMapper();
        try {
            Ong ong = mapper.map(ongDTO, Ong.class);
            Ong newOng = repository.save(ong);
            return mapper.map(newOng, OngDTO.class);
        } catch (Exception e) {
            throw new UnsupportedOperationException("Ocurrio un error al guardar los datos");
        }
    }

    @Override
    public OngDTO update(OngDTO ongDTO) {
        return this.save(ongDTO);
    }

    @Override
    public void delete(Long id) {


    }

}
