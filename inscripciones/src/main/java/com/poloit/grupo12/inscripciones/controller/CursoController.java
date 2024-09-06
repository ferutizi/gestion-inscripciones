package com.poloit.grupo12.inscripciones.controller;

import com.poloit.grupo12.inscripciones.dto.CursoDTO;
import com.poloit.grupo12.inscripciones.service.implementacion.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
@RestController
@RequestMapping("/api/curso")
public class CursoController {
    @Autowired
    private CursoService service;

    @GetMapping("/listar")
    public ResponseEntity<?> findAll(Pageable pageable) {
        Page<CursoDTO> lista = service.findAll(pageable);
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Page.empty());
        }
            return ResponseEntity.ok(lista);
    }

    @GetMapping("obtener/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<CursoDTO> optDTO = Optional.ofNullable(service.findById(id));
        if (optDTO.isPresent()) {
            return ResponseEntity.ok(optDTO);
        } else {
            String mensajeError = "No se encontro el curso con ID " + id;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
        }
    }

    @PostMapping("/crear")
    public ResponseEntity<?> create(@RequestBody CursoDTO cursoDTO) {
        try {
            CursoDTO nuevoCurso = service.save(cursoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCurso);
        } catch (Exception e) {
            String mensajeError = "Ocurrió un error al crear el curso";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensajeError);
        }
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> update(@RequestBody CursoDTO cursoDTO,
                                  @PathVariable Long id) {
        if (service.findById(id) != null) {
            CursoDTO cursoEditado = service.update(id, cursoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(cursoEditado);
        } else {
            String mensajeError = "No se encontro el curso con ID " + id;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
        }
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (service.findById(id) != null) {
            service.delete(id);
            String mensajeOk = "Se elimino el curso con el ID " + id;
            return ResponseEntity.ok(mensajeOk);

        } else {
            String mensajeError = "No se encontro el curso con el ID " + id;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
        }
    }
}
