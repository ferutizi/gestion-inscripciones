package com.poloit.grupo12.inscripciones.controller;

import com.poloit.grupo12.inscripciones.dto.EstudianteDTO;
import com.poloit.grupo12.inscripciones.service.implementacion.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
@RestController
@RequestMapping("/api/estudiante")
public class EstudianteController {
    @Autowired
    private EstudianteService service;

    @GetMapping("/listar")
    public ResponseEntity<?> findAll(Pageable pageable) {
        Page<EstudianteDTO> lista = service.findAll(pageable);
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Page.empty());
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping("obtener/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<EstudianteDTO> optDTO = Optional.ofNullable(service.findById(id));
        if (optDTO.isPresent()) {
            return ResponseEntity.ok(optDTO);
        } else {
            String mensajeError = "No se encontro el estudiante con ID " + id;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
        }
    }

    @PostMapping("/crear")
    public ResponseEntity<?> create(@RequestBody EstudianteDTO estudianteDTO) {
        try {
            EstudianteDTO nuevoEstudiante = service.save(estudianteDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoEstudiante);
        } catch (Exception e) {
            String mensajeError = "Ocurrió un error al crear el estudiante";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensajeError);
        }
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> update(@RequestBody EstudianteDTO estudianteDTO,
                                  @PathVariable Long id) {
        if (service.findById(id) != null) {
            EstudianteDTO estudianteEditado = service.update(id, estudianteDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(estudianteEditado);
        } else {
            String mensajeError = "No se encontro el estudiante con ID " + id;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
        }
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (service.findById(id) != null) {
            service.delete(id);
            String mensajeOk = "Se elimino el estudiante con el ID " + id;
            return ResponseEntity.ok(mensajeOk);

        } else {
            String mensajeError = "No se encontro el estudiante con el ID " + id;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
        }
    }

}
