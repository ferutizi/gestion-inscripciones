package com.poloit.grupo12.inscripciones.controller;

import com.poloit.grupo12.inscripciones.dto.OngDTO;
import com.poloit.grupo12.inscripciones.service.interfaces.IOngService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
@RestController
@RequestMapping("/api/ong")
public class OngController {
    @Autowired
    private IOngService service;

    @GetMapping("/listar")
    public ResponseEntity<?> findAll(Pageable pageable) {
        Page<OngDTO> lista = service.findAll(pageable);
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Page.empty());
        }
            return ResponseEntity.ok(lista);
    }

    @GetMapping("obtener/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<OngDTO> opt = Optional.ofNullable(service.findById(id));
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        } else {
            String mensajeError = "No se encontro la ONG con ID " + id;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
        }
    }

    @PostMapping("/crear")
    public ResponseEntity<?> create(@RequestBody OngDTO ongDTO) {
        try {
            OngDTO nuevaOng = service.save(ongDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaOng);
        } catch (Exception e) {
            String mensajeError = "Ocurrió un error al crear la ONG " + ongDTO.getNombre();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensajeError);
        }
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> update(@RequestBody OngDTO ongDTO,
                                    @PathVariable Long id) {
        if (service.findById(id) != null) {
            OngDTO OngEditada = service.update(id, ongDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(OngEditada);
        } else {
            String mensajeError = "No se encontro la ONG con ID " + id;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
        }
    }
    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (service.findById(id) != null) {
            service.delete(id);
            String mensajeOk = "Se elimino la ONG con ID " + id;
            return ResponseEntity.ok(mensajeOk);

        } else {
            String mensajeError = "No se encontro la ONG con ID " + id;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
        }
    }

}
