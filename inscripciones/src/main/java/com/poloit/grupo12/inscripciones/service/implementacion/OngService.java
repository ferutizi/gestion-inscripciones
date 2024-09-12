package com.poloit.grupo12.inscripciones.service.implementacion;

import com.poloit.grupo12.inscripciones.dto.OngDTO;
import com.poloit.grupo12.inscripciones.model.Ong;
import com.poloit.grupo12.inscripciones.repository.IOngRepository;
import com.poloit.grupo12.inscripciones.service.interfaces.IOngService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class OngService implements IOngService {
    @Autowired
    private IOngRepository repository;
    @Override
    public Page<OngDTO> findAll(Pageable pageable) {
        Page<Ong> ongs = repository.findAll(pageable);
        return ongs.map(this::converToDto);
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
    public OngDTO update(Long id, OngDTO ongDTO) {
        ModelMapper mapper = new ModelMapper();
        try {
            Ong ong = mapper.map(ongDTO, Ong.class);
            ong.setId(id);
            Ong newOng = repository.save(ong);
            return mapper.map(newOng, OngDTO.class);
        } catch (Exception e) {
            throw new UnsupportedOperationException("Ocurrio un error al actualizar los datos");
        }
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
    private OngDTO converToDto(Ong ong) {
        ModelMapper mapper = new ModelMapper();
        OngDTO ongDTO = mapper.map(ong, OngDTO.class);
        return ongDTO;
    }

}
