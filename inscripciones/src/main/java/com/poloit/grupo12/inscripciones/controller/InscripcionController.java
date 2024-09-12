package com.poloit.grupo12.inscripciones.controller;

import com.poloit.grupo12.inscripciones.dto.InscripcionDTO;
import com.poloit.grupo12.inscripciones.service.implementacion.InscripcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inscripciones")
public class InscripcionController {

    @Autowired
    private InscripcionService inscripcionService;

    @PostMapping
    public InscripcionDTO crearInscripcion(@RequestBody InscripcionDTO inscripcionDTO) {
        return inscripcionService.save(inscripcionDTO);
    }

    @GetMapping
    public Page<InscripcionDTO> obtenerInscripciones(Pageable pageable) {
        return inscripcionService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public InscripcionDTO obtenerInscripcionPorId(@PathVariable Long id) {
        return inscripcionService.findById(id);
    }

    @PutMapping("/{id}")
    public InscripcionDTO actualizarInscripcion(@PathVariable Long id, @RequestBody InscripcionDTO inscripcionDTO) {
        return inscripcionService.update(id, inscripcionDTO);
    }

    @DeleteMapping("/{id}")
    public void eliminarInscripcion(@PathVariable Long id) {
        inscripcionService.delete(id);
    }
}
