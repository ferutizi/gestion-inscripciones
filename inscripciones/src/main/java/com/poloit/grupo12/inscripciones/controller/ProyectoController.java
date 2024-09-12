package com.poloit.grupo12.inscripciones.controller;

import com.poloit.grupo12.inscripciones.dto.ProyectoDTO;
import com.poloit.grupo12.inscripciones.model.Proyecto;
import com.poloit.grupo12.inscripciones.repository.IProyectoRepository;
import com.poloit.grupo12.inscripciones.service.implementacion.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/proyecto")
public class ProyectoController {

    @Autowired
    private ProyectoService service;

    @Autowired
    private IProyectoRepository proyectoRepository;

    // Obtener proyectos con opción de limitarlos
    @GetMapping("/listar")
    public ResponseEntity<?> findAll(@RequestParam(defaultValue = "6") int limit) {
        List<Proyecto> proyectos;

        if (limit == 0) {
            proyectos = proyectoRepository.findAll();
        } else {
            Pageable pageable = PageRequest.of(0, limit);
            proyectos = proyectoRepository.findProyectosLimitados(pageable);
        }

        if (proyectos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron proyectos.");
        }

        return ResponseEntity.ok(proyectos);
    }

    @GetMapping("obtener/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<ProyectoDTO> optDTO = Optional.ofNullable(service.findById(id));
        if (optDTO.isPresent()) {
            return ResponseEntity.ok(optDTO);
        } else {
            String mensajeError = "No se encontró el proyecto con ID " + id;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
        }
    }

    @PostMapping("/crear")
    public ResponseEntity<?> create(@RequestBody ProyectoDTO proyectoDTO) {
        try {
            ProyectoDTO nuevoProyecto = service.save(proyectoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProyecto);
        } catch (Exception e) {
            String mensajeError = "Ocurrió un error al crear el proyecto";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensajeError);
        }
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> update(@RequestBody ProyectoDTO proyectoDTO, @PathVariable Long id) {
        if (service.findById(id) != null) {
            ProyectoDTO proyectoEditado = service.update(id, proyectoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(proyectoEditado);
        } else {
            String mensajeError = "No se encontró el proyecto con ID " + id;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
        }
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (service.findById(id) != null) {
            service.delete(id);
            String mensajeOk = "Se eliminó el proyecto con el ID " + id;
            return ResponseEntity.ok(mensajeOk);
        } else {
            String mensajeError = "No se encontró el proyecto con el ID " + id;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
        }
    }
}
